<template>
  <NuxtLayout name="web">
    <div class="pt-32 pb-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <span
            class="inline-block px-4 py-1 bg-emerald-100 text-emerald-600 rounded-full text-sm font-medium mb-4"
          >
            Contact Us
          </span>
          <h1 class="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Get in Touch
          </h1>
          <p class="text-lg text-slate-600 max-w-2xl mx-auto">
            Have questions or need assistance? We're here to help. Reach out to
            us and our team will get back to you shortly.
          </p>
        </div>

        <!-- Contact Form and Info -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <!-- Contact Form -->
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <h2 class="text-2xl font-bold text-slate-900 mb-6">
              Send us a Message
            </h2>
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Name -->
              <FormInput
                v-model="form.name"
                label="Full Name"
                type="text"
                placeholder="John Doe"
                :error="errors.name"
              />

              <!-- Email -->
              <FormInput
                v-model="form.email"
                label="Email Address"
                type="email"
                placeholder="john@example.com"
                :error="errors.email"
              />

              <!-- Subject -->
              <FormInput
                v-model="form.subject"
                label="Subject"
                type="text"
                placeholder="How can we help you?"
                :error="errors.subject"
              />

              <!-- Message -->
              <div>
                <div class="flex justify-between items-center mb-1">
                  <label class="block text-sm font-medium text-slate-700">
                    Message
                    <span class="text-red-500">*</span>
                  </label>
                  <span v-if="errors.message" class="text-sm text-red-600">{{
                    errors.message
                  }}</span>
                </div>
                <textarea
                  v-model="form.message"
                  rows="4"
                  :class="[
                    'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200',
                    errors.message
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                      : 'border-slate-300 focus:ring-emerald-500 focus:border-emerald-500',
                  ]"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center space-x-2"
              >
                <Icon
                  v-if="isSubmitting"
                  name="i-uil-spinner"
                  class="w-5 h-5 animate-spin"
                />
                <span>{{ isSubmitting ? "Sending..." : "Send Message" }}</span>
              </button>
              <div v-if="errors.form" class="text-sm text-red-600">
                {{ errors.form }}
              </div>
            </form>
          </div>

          <!-- Contact Information -->
          <div class="space-y-8">
            <div>
              <h2 class="text-2xl font-bold text-slate-900 mb-6">
                Contact Information
              </h2>
              <div class="space-y-4">
                <div class="flex items-start space-x-4">
                  <div class="p-3 bg-emerald-100 rounded-lg">
                    <svg
                      class="w-6 h-6 text-emerald-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-slate-900">Address</h3>
                    <p class="text-slate-600">
                      No. 22, 1st Floor, Supermarket Building, Nugegoda, Sri Lanka
                    </p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="p-3 bg-emerald-100 rounded-lg">
                    <svg
                      class="w-6 h-6 text-emerald-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-slate-900">Email</h3>
                    <p class="text-slate-600">info@stclk.com | stcs@sltnet.lk</p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="p-3 bg-emerald-100 rounded-lg">
                    <svg
                      class="w-6 h-6 text-emerald-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-slate-900">Hot Line</h3>
                    <p class="text-slate-600">+(94) 714 009 247 | +(94) 702 122 923</p>
                  </div>

                </div>
                <div class="flex items-start space-x-4">
                  <div class="p-3 bg-emerald-100 rounded-lg">
                    <svg
                      class="w-6 h-6 text-emerald-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-slate-900">Sales (Plastic Items)</h3>
                    <p class="text-slate-600">+(94) 712 444 924</p>
                  </div>
                  
                </div>

                <div class="flex items-start space-x-4">
                  <div class="p-3 bg-emerald-100 rounded-lg">
                    <svg
                      class="w-6 h-6 text-emerald-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-slate-900">Sales (Machinery & Accessories)</h3>
                    <p class="text-slate-600">+(94) 773 594 755</p>
                  </div>
                  
                </div>
              </div>
            </div>

            <!-- Business Hours -->
            <div>
              <h2 class="text-2xl font-bold text-slate-900 mb-6">
                Business Hours
              </h2>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-slate-600">Monday - Saturday</span>
                  <span class="font-medium text-slate-900"
                    >7:30 AM - 5:30 PM</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-slate-600">Sunday</span>
                  <span class="font-medium text-slate-900">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  form?: string;
}

interface LastMessageInfo {
  timestamp: number;
  email: string;
}

const form = ref<ContactForm>({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const errors = ref<FormErrors>({});
const isSubmitting = ref(false);
const supabase = useSupabaseClient();
const { success, error } = useToast()

// Check if user can send message
function canSendMessage(email: string): boolean {
  const lastMessageInfo = localStorage.getItem("lastMessageSent");
  if (!lastMessageInfo) return true;

  const { timestamp, email: lastEmail } = JSON.parse(lastMessageInfo) as LastMessageInfo;
  const now = Date.now();
  const oneDayInMs = 24 * 60 * 60 * 1000;

  // If it's the same email and less than 24 hours have passed
  if (email === lastEmail && (now - timestamp) < oneDayInMs) {
    const hoursLeft = Math.ceil((oneDayInMs - (now - timestamp)) / (60 * 60 * 1000));
    errors.value.form = `You can send another message in ${hoursLeft} hours`;
    return false;
  }

  return true;
}

// Store message timestamp
function storeMessageTimestamp(email: string) {
  const messageInfo: LastMessageInfo = {
    timestamp: Date.now(),
    email,
  };
  localStorage.setItem("lastMessageSent", JSON.stringify(messageInfo));
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Form validation
function validateForm(): boolean {
  errors.value = {};
  let isValid = true;

  // Check if user can send message
  if (!canSendMessage(form.value.email)) {
    isValid = false;
    return isValid;
  }

  // Name validation
  if (!form.value.name.trim()) {
    errors.value.name = "Name is required";
    isValid = false;
  } else if (form.value.name.trim().length < 2) {
    errors.value.name = "Name must be at least 2 characters";
    isValid = false;
  }

  // Email validation
  if (!form.value.email.trim()) {
    errors.value.email = "Email is required";
    isValid = false;
  } else if (!isValidEmail(form.value.email)) {
    errors.value.email = "Please enter a valid email address";
    isValid = false;
  }

  // Subject validation
  if (!form.value.subject.trim()) {
    errors.value.subject = "Subject is required";
    isValid = false;
  } else if (form.value.subject.trim().length < 3) {
    errors.value.subject = "Subject must be at least 3 characters";
    isValid = false;
  }

  // Message validation
  if (!form.value.message.trim()) {
    errors.value.message = "Message is required";
    isValid = false;
  } else if (form.value.message.trim().length < 10) {
    errors.value.message = "Message must be at least 10 characters";
    isValid = false;
  }

  return isValid;
}

// Handle form submission
async function handleSubmit() {
  if (!validateForm()) return;

  try {
    isSubmitting.value = true;
    await supabase.from("inquiries").insert([
      {
        name: form.value.name,
        email: form.value.email,
        subject: form.value.subject,
        message: form.value.message,
      },
    ]);

    // Store message timestamp after successful submission
    storeMessageTimestamp(form.value.email);

    // Reset form after successful submission
    form.value = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };
    errors.value = {};

    // Show success message
    success('Message sent successfully!')
  } catch (error) {
    console.error("Error sending message:", error);
    // Show error message
    error('Failed to send message. Please try again.');
  } finally {
    isSubmitting.value = false;
  }
}

// Add meta information for SEO
useHead({
  title: "Contact Us - Samarasinghe Trade Center",
  meta: [
    {
      name: "description",
      content:
        "Contact Samarasinghe Trade Center for any inquiries about our plastic and recycling machine solutions.",
    },
  ],
});
</script>
