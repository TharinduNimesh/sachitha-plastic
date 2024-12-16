import { defineStore } from "pinia";
import type { UserState, Profile, UserStatus } from "~/types/auth.types";

export const useAuthStore = defineStore("auth", {
  state: (): UserState => ({
    id: null,
    name: null,
    email: null,
    role: null,
    status: null,
    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state): boolean => !!state.id,
    isAdmin: (state): boolean => state.role === "Admin",
    isModerator: (state): boolean => state.role === "Moderator",
  },

  actions: {
    async fetchUser() {
      if (this.loading) return null;

      try {
        this.loading = true;
        this.error = null;

        const {
          data: { user },
        } = await useSupabaseClient().auth.getUser();
        if (!user) {
          this.clearUser();
          return null;
        }

        const [profileData, statusData] = await this.fetchData(user.id);

        if (!statusData.data) {
          await this.setupUser(user.email!);
          const [newProfileData, newStatusData] = await this.fetchData(user.id);
          return this.updateUserState(
            newProfileData.data as Profile,
            newStatusData.data as UserStatus
          );
        }

        return this.updateUserState(
          profileData.data as Profile,
          statusData.data as UserStatus
        );
      } catch (error) {
        this.error =
          error instanceof Error ? error.message : "An unknown error occurred";
        return null;
      } finally {
        this.loading = false;
      }
    },

    clearUser() {
      Object.assign(this, {
        id: null,
        name: null,
        email: null,
        role: null,
        status: null,
        error: null,
      });
    },

    async fetchData(userId: string) {
      const supabase = useSupabaseClient();
      return await Promise.all([
        supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
        supabase
          .from("user_status")
          .select("*")
          .eq("user_id", userId)
          .maybeSingle(),
      ]);
    },

    async setupUser(email: string) {
      await useSupabaseClient().rpc("setup_account", { email_input: email });
    },

    updateUserState(profile: Profile, userStatus: UserStatus) {
      if (!profile || !userStatus) {
        throw new Error("Invalid user data received");
      }

      Object.assign(this, {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        role: userStatus.role,
        status: userStatus.status,
      });

      return this.$state;
    },
  },
});
