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
      <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div class="flex flex-col gap-6">
          <!-- Search Bar -->
          <div class="relative max-w-2xl">
            <div class="relative">
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Search members by name, email or role..."
                class="w-full pl-12 pr-4 h-12 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
              />
              <Icon
                name="i-uil-search"
                class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
              />
            </div>
          </div>

          <!-- Role Filter -->
          <div class="flex flex-wrap items-center gap-4">
            <div class="flex items-center gap-2">
              <button
                v-for="role in roles"
                :key="role"
                @click="toggleRoleFilter(role)"
                class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                :class="
                  selectedRole === role
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'text-slate-600 hover:bg-slate-50'
                "
              >
                {{ role }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Members List -->
      <div class="space-y-4">
        <div
          v-for="member in filteredMembers"
          :key="member.id"
          class="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
          <div class="p-6">
            <div class="flex items-center justify-between">
              <!-- Member Info -->
              <div class="flex items-center gap-6">
                <!-- Avatar/Initial -->
                <div
                  class="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0"
                >
                  <span class="text-lg font-medium text-emerald-600">
                    {{ member.name.charAt(0) }}
                  </span>
                </div>

                <div>
                  <h3 class="text-lg font-semibold text-slate-900">
                    {{ member.name }}
                  </h3>
                  <div class="mt-1 flex items-center gap-4">
                    <p class="text-sm text-slate-600 flex items-center gap-2">
                      <Icon name="i-uil-envelope" class="w-4 h-4" />
                      {{ member.email }}
                    </p>
                    <div class="flex items-center gap-2">
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        :class="{
                          'bg-emerald-50 text-emerald-600':
                            member.role === 'Admin',
                          'bg-blue-50 text-blue-600':
                            member.role === 'Moderator',
                          'bg-slate-50 text-slate-600':
                            member.role === 'Member',
                        }"
                      >
                        {{ member.role }}
                      </span>
                      <span
                        v-if="member.status === 'suspended'"
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-600"
                      >
                        Suspended
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div
                class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <button
                  v-if="member.status !== 'suspended'"
                  @click="suspendMember(member.id)"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 rounded-lg transition-colors"
                >
                  <Icon name="i-uil-ban" class="w-4 h-4" />
                  <span class="hidden sm:inline">Suspend</span>
                </button>
                <button
                  v-else
                  @click="reactivateMember(member.id)"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                >
                  <Icon name="i-uil-check" class="w-4 h-4" />
                  <span class="hidden sm:inline">Reactivate</span>
                </button>
                <button
                  @click="removeMember(member.id)"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Icon name="i-uil-trash-alt" class="w-4 h-4" />
                  <span class="hidden sm:inline">Remove</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pending Invites List -->
      <div class="space-y-4 mt-5">
        <h2 v-if="filteredInvites.length > 0" class="text-lg font-bold text-slate-900">Pending Invites</h2>
        <div
          v-for="invite in filteredInvites"
          :key="invite.id"
          class="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
          <div class="p-6">
            <div class="flex items-center justify-between">
              <!-- Invite Info -->
              <div class="flex items-center gap-6">
                <div>
                  <h3 class="text-lg font-semibold text-slate-900">
                    {{ invite.email }}
                  </h3>
                  <div class="mt-1 flex items-center gap-4">
                    <p class="text-sm text-slate-600 flex items-center gap-2">
                      <Icon name="i-uil-envelope" class="w-4 h-4" />
                      {{ invite.email }}
                    </p>
                    <div class="flex items-center gap-2">
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        :class="{
                          'bg-emerald-50 text-emerald-600':
                            invite.role === 'Admin',
                          'bg-blue-50 text-blue-600':
                            invite.role === 'Moderator',
                          'bg-slate-50 text-slate-600':
                            invite.role === 'Member',
                        }"
                      >
                        {{ invite.role }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div
                class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <button
                  @click="removeInvite(invite.id)"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Icon name="i-uil-trash-alt" class="w-4 h-4" />
                  <span class="hidden sm:inline">Cancel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CommonModalNewMemberModal
        v-model="showNewMemberModal"
        @invited="handleMemberInvited"
      />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
// Member data
interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  status?: string;
  created_at: string;
}

interface PendingInvite {
  id: number;
  email: string;
  role: string;
  created_at: string;
}

const showNewMemberModal = ref(false);
const members = ref<Member[]>([]);
const pendingInvites = ref<PendingInvite[]>([]);
const isLoading = ref(true);

// Search and filter
const searchQuery = ref("");
const selectedRole = ref("");
const roles = ["Admin", "Moderator"];

// Load members and pending invites
const loadMembersAndInvites = async () => {
  try {
    isLoading.value = true;
    const supabase = useSupabaseClient();

    // Load members with their status in separate queries
    const { data: membersData, error: membersError } = await supabase
      .from("profiles")
      .select(`
        *,
        user_status (
          role,
          status
        )
      `);

    if (membersError) throw membersError;

    console.log(membersData[0]);
    // Format members data
    members.value = membersData.map(member => ({
      id: member.id,
      name: member.name || 'Unknown',
      email: member.email,
      role: member.user_status?.role || 'Member',
      status: member.user_status?.status,
      created_at: member.created_at
    }));

    // Load pending invites
    const { data: invitesData, error: invitesError } = await supabase
      .from("invites")
      .select("*")
      .eq("is_used", false);

    if (invitesError) throw invitesError;

    // Format pending invites data
    pendingInvites.value = invitesData.map(invite => ({
      id: invite.id,
      email: invite.email,
      role: invite.role,
      created_at: invite.created_at
    }));

  } catch (error) {
    console.error("Error loading members and invites:", error);
    const toast = useToast();
    toast.error("Failed to load members and invites");
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
  if (selectedRole.value) {
    result = result.filter(
      (member) => member.role === selectedRole.value
    );
  }

  return result;
});

const filteredInvites = computed(() => {
  if (!searchQuery.value.trim()) return pendingInvites.value;

  const query = searchQuery.value.toLowerCase();
  return pendingInvites.value.filter(
    (invite) => invite.email.toLowerCase().includes(query)
  );
});

// Action handlers
const handleMemberInvited = () => {
  loadMembersAndInvites();
};

const toggleRoleFilter = (role: string) => {
  selectedRole.value = selectedRole.value === role ? "" : role;
};

const removeInvite = async (inviteId: number) => {
  try {
    const supabase = useSupabaseClient();
    await supabase.from("invites").delete().eq("id", inviteId);
    loadMembersAndInvites();
  } catch (error) {
    console.error("Error removing invite:", error);
    const toast = useToast();
    toast.error("Failed to remove invite");
  }
};

// Load data on mount
onMounted(() => {
  loadMembersAndInvites();
});
</script>
