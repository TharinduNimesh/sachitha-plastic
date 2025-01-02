<template>
  <NuxtLayout name="console">
    <div class="p-6">
      <!-- Page Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Members</h1>
          <p class="mt-1 text-slate-600">
            Manage team members and their access levels
          </p>
        </div>
        <button
          @click="showNewMemberModal = true"
          class="btn-primary flex items-center space-x-2"
        >
          <Icon name="i-uil-user-plus" class="w-5 h-5" />
          <span>Add Member</span>
        </button>
      </div>

      <!-- Filters Section -->
      <ConsoleMembersFilters
        v-model:search="searchQuery"
        v-model:selectedRole="selectedRole"
        :roles="roles"
      />

      <!-- Members List -->
      <div class="space-y-4">
        <ConsoleMembersCard
          v-for="member in filteredMembers"
          :key="member.id"
          :member="member"
          :current-user-email="user?.email"
          @suspend="suspendMember"
          @remove="removeMember"
          @reactivate="reactivateMember"
        />
      </div>

      <!-- Pending Invites List -->
      <ConsoleMembersInviteList
        :invites="filteredInvites"
        @resend="resendInvite"
        @remove="confirmRemoveInvite"
      />

      <CommonModalNewMemberModal
        v-model="showNewMemberModal"
        @invited="handleMemberInvited"
      />
    </div>

    <!-- Confirmation Modals -->
    <CommonModal v-model="showConfirmModal" :title="confirmModalTitle">
      <p class="text-slate-600">{{ confirmModalMessage }}</p>
      <template #footer>
        <button
          type="button"
          class="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50"
          @click="showConfirmModal = false"
        >
          Cancel
        </button>
        <button
          type="submit"
          :class="confirmModalActionClass"
          class="px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md disabled:opacity-50"
          @click="handleConfirmAction"
        >
          {{ confirmModalActionText }}
        </button>
      </template>
    </CommonModal>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Database } from "~/types";
import type { Member, PendingInvite, MemberRole } from "~/types/members";

// State
const showNewMemberModal = ref(false);
const members = ref<Member[]>([]);
const pendingInvites = ref<PendingInvite[]>([]);
const isLoading = ref(true);
const searchQuery = ref("");
const selectedRole = ref<"All" | MemberRole>("All");
const roles: ("All" | MemberRole)[] = ["All", "Admin", "Moderator"];

// Add at the top of the script setup
const { error: toastError, success: toastSuccess } = useToast();

// Add user ref to check current user
const user = useSupabaseUser();

// Add meta information for SEO
useHead({
  title: 'Members - Console',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})

// Load members and pending invites
const loadMembersAndInvites = async () => {
  try {
    isLoading.value = true;
    const supabase = useSupabaseClient();

    // Load members with their status in separate queries
    const { data: membersData, error: membersError } = await supabase.from(
      "profiles"
    ).select(`
        *,
        user_status (
          role,
          status
        )
      `);

    if (membersError) throw membersError;

    console.log(membersData[0]);
    // Format members data
    members.value = membersData.map((member) => ({
      id: member.id,
      name: member.name || "Unknown",
      email: member.email,
      role: member.user_status?.role || "Member",
      status: member.user_status?.status || "Active",
      created_at: member.created_at,
    })) as Member[];

    // Load pending invites
    const { data: invitesData, error: invitesError } = await supabase
      .from("invites")
      .select("*")
      .eq("is_used", false);

    if (invitesError) throw invitesError;

    // Format pending invites data
    pendingInvites.value = invitesData.map((invite) => ({
      id: invite.id,
      email: invite.email,
      role: invite.role,
      is_expired: invite.is_expired,
      is_used: invite.is_used,
      created_at: invite.created_at,
    }));
  } catch (error) {
    console.error("Error loading members and invites:", error);
    toastError("Failed to load members and invites");
  } finally {
    isLoading.value = false;
  }
};

// Filter members and invites
const filteredMembers = computed(() => {
  let result = [...members.value];

  // Apply search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (member) =>
        member.name.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query)
    );
  }

  // Apply role filter
  if (selectedRole.value !== "All") {
    result = result.filter((member) => member.role === selectedRole.value);
  }

  return result;
});

const filteredInvites = computed(() => {
  let result = pendingInvites.value.filter((invite) => !invite.is_used);

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter((invite) =>
      invite.email.toLowerCase().includes(query)
    );
  }

  return result;
});

// Action handlers
const handleMemberInvited = () => {
  loadMembersAndInvites();
};

const toggleRoleFilter = (role: string) => {
  selectedRole.value = selectedRole.value === role ? "All" : role;
};

const removeInvite = async (inviteId: string) => {
  try {
    const supabase = useSupabaseClient();
    await supabase.from("invites").delete().eq("id", inviteId);
    loadMembersAndInvites();
  } catch (error) {
    console.error("Error removing invite:", error);
    toastError("Failed to remove invite");
  }
};

// Confirmation modal state
const showConfirmModal = ref(false);
const confirmModalTitle = ref("");
const confirmModalMessage = ref("");
const confirmModalActionText = ref("");
const confirmModalActionClass = ref("");
const confirmAction = ref<(() => Promise<void>) | null>(null);

// Helper for confirmation modal
const showConfirmation = (
  title: string,
  message: string,
  actionText: string,
  actionClass: string,
  action: () => Promise<void>
) => {
  confirmModalTitle.value = title;
  confirmModalMessage.value = message;
  confirmModalActionText.value = actionText;
  confirmModalActionClass.value = actionClass;
  confirmAction.value = action;
  showConfirmModal.value = true;
};

const handleConfirmAction = async () => {
  if (confirmAction.value) {
    await confirmAction.value();
  }
  showConfirmModal.value = false;
};

// Member actions
const suspendMember = async (memberId: string) => {
  const memberToSuspend = members.value.find((m) => m.id === memberId);

  if (memberToSuspend?.email === user.value?.email) {
    toastError("You cannot suspend your own account");
    return;
  }

  showConfirmation(
    "Suspend Member",
    "Are you sure you want to suspend this member? They will lose access to their account.",
    "Suspend",
    "bg-yellow-600 hover:bg-yellow-700",
    async () => {
      try {
        const supabase = useSupabaseClient();
        const { error } = await supabase
          .from("user_status")
          .update({ status: "Suspend" })
          .eq("user_id", memberId);

        if (error) throw error;

        toastSuccess("Member suspended successfully");
        await loadMembersAndInvites();
      } catch (error) {
        console.error("Error suspending member:", error);
        toastError("Failed to suspend member");
      }
    }
  );
};

const removeMember = async (memberId: string) => {
  const memberToRemove = members.value.find((m) => m.id === memberId);

  if (memberToRemove?.email === user.value?.email) {
    toastError("You cannot remove your own account");
    return;
  }

  showConfirmation(
    "Remove Member",
    "Are you sure you want to remove this member? This action cannot be undone.",
    "Remove",
    "bg-red-600 hover:bg-red-700",
    async () => {
      try {
        const supabase = useSupabaseClient();
        const { error } = await supabase
          .from("user_status")
          .update({ status: "Removed" })
          .eq("user_id", memberId);

        if (error) throw error;

        toastSuccess("Member removed successfully");
        await loadMembersAndInvites();
      } catch (error) {
        console.error("Error removing member:", error);
        toastError("Failed to remove member");
      }
    }
  );
};

// Add reactivateMember function
const reactivateMember = async (memberId: string) => {
  showConfirmation(
    "Reactivate Member",
    "Are you sure you want to reactivate this member? They will regain access to their account.",
    "Reactivate",
    "bg-emerald-600 hover:bg-emerald-700",
    async () => {
      try {
        const supabase = useSupabaseClient();
        const { error } = await supabase
          .from("user_status")
          .update({ status: "Active" })
          .eq("user_id", memberId);

        if (error) throw error;

        toastSuccess("Member reactivated successfully");
        await loadMembersAndInvites();
      } catch (error) {
        console.error("Error reactivating member:", error);
        toastError("Failed to reactivate member");
      }
    }
  );
};

// Invite actions
const confirmRemoveInvite = (invite: PendingInvite) => {
  showConfirmation(
    "Cancel Invitation",
    `Are you sure you want to cancel the invitation sent to ${invite.email}?`,
    "Cancel Invitation",
    "bg-red-600 hover:bg-red-700",
    async () => {
      await removeInvite(invite.id);
    }
  );
};

const resendInvite = async (invite: PendingInvite) => {
  showConfirmation(
    "Resend Invitation",
    `Are you sure you want to resend the invitation to ${invite.email}?`,
    "Resend",
    "bg-emerald-600 hover:bg-emerald-700",
    async () => {
      try {
        const supabase = useSupabaseClient();

        // Update invite status
        const { error: updateError } = await supabase
          .from("invites")
          .update({ is_expired: false })
          .eq("id", invite.id);

        if (updateError) throw updateError;

        // Resend email
        const { error: emailError } = await useFetch("/api/invites/send", {
          method: "POST",
          body: {
            email: invite.email,
            role: invite.role,
            inviteId: invite.id,
          },
        });

        if (emailError.value) throw emailError.value;

        toastSuccess("Invitation resent successfully");
        await loadMembersAndInvites();
      } catch (error) {
        console.error("Error resending invitation:", error);
        toastError("Failed to resend invitation");
      }
    }
  );
};

// Load data on mount
onMounted(() => {
  loadMembersAndInvites();
});
</script>
