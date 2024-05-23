<script setup lang="ts">
// import HelloWorld from '@/components/HelloWorld.vue';
import { ref, reactive } from 'vue';

import { useDisplay } from 'vuetify';
import type User from "@/interfaces/HomeViewInterface";
const { width, smAndDown, mobile, mdAndUp } = useDisplay();

const jsonLd = JSON.stringify(
  {
    '@schema': 'https://json.schemastore.org/jsonld.json',
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    name: 'Advanced Solution',
    url: 'https://github.com/shawon3719',
    description: 'Advanced Solution',
  },
  null,
  2
);
interface FilePreview {
  name: string;
  url: string;
  type: string;
}

const fileInput = ref<HTMLInputElement | null>(null);
const file = ref<FilePreview | null>(null);
const snackbarOpen = ref<boolean | undefined>(false);
const timeout = ref<number | undefined>(2000);
const user: User = reactive({
  name: '',
  email: '',
  phone: '',
  noticePeriod: '',
  expectedSalary: '',
});

const triggerFileUpload = () => {
  fileInput.value?.click();
};

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const selectedFile = target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      file.value = {
        name: selectedFile.name,
        url: e.target?.result as string,
        type: selectedFile.type,
      };
    };
    reader.readAsDataURL(selectedFile);
  }
};

const removeFile = () => {
  file.value = null;
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const isPdf = (type: string) => {
  return type === 'application/pdf';
};

const submit = () => {
  snackbarOpen.value = true;
};
</script>

<template>
  <v-container style="max-width: 1440px; padding: unset !important">
    <div :class="`hero-title${smAndDown ? '__sm' : '__lg'}`">
      <span class="underline-text">Fast Track</span>
      <span>{{ '&nbsp;' }}Your Job Search</span>
      <span class="dot">.</span>
    </div>
    <v-dialog
      v-model="snackbarOpen"
      width="auto"
    >
      <v-card
        max-width="400"
        text="Thanks for your application. Our agent will contact you soon."
        title="Thank you"
      >
        <template v-slot:actions>
          <v-btn class="ms-auto" variant="text" @click="snackbarOpen = false">
            Okay
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
    <v-row no-gutters :class="`custom-card${smAndDown ? '__sm' : '__lg'}`">
      <v-col
        cols="12"
        sm="12"
        md="4"
        :class="`custom-card${smAndDown ? '__sm' : '__lg'}--content`"
      >
        <!-- <div :class="`custom-card${smAndDown ? '__sm' : '__lg'}--content--card`"> -->
        <div
          :class="`custom-card${smAndDown ? '__sm' : '__lg'}--content--label`"
        >
          For Candidates
        </div>
        <div
          :class="`custom-card${
            smAndDown ? '__sm' : '__lg'
          }--content--top-title`"
        >
          Ready to change your job?
        </div>
        <img
          :class="`custom-card${smAndDown ? '__sm' : '__lg'}--content--image`"
          src="/assets/images/partner.svg"
          alt="job"
        />
        <div
          :class="`custom-card${
            smAndDown ? '__sm' : '__lg'
          }--content--footer-section`"
        >
          <div
            :class="`custom-card${
              smAndDown ? '__sm' : '__lg'
            }--content--footer-section--description`"
          >
            Send us your resume with expected salary, we'll turbocharge your job
            hunt.
          </div>
          <div
            :class="`custom-card${
              smAndDown ? '__sm' : '__lg'
            }--content--footer-section--footer`"
          >
            Revolutionize your career journey!
          </div>
        </div>
        <!-- </div> -->
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="4"
        :class="`custom-card${smAndDown ? '__sm' : '__lg'}--content`"
      >
        <!-- <div :class="`custom-card${smAndDown ? '__sm' : '__lg'}--content--card`"> -->
        <div
          :class="`custom-card${smAndDown ? '__sm' : '__lg'}--content--label`"
        >
          For Companies
        </div>
        <div
          :class="`custom-card${
            smAndDown ? '__sm' : '__lg'
          }--content--top-title`"
        >
          Partner with us!
        </div>
        <img
          :class="`custom-card${smAndDown ? '__sm' : '__lg'}--content--image`"
          src="/assets/images/job.svg"
          alt="job"
        />
        <div
          :class="`custom-card${
            smAndDown ? '__sm' : '__lg'
          }--content--footer-section`"
        >
          <div
            :class="`custom-card${
              smAndDown ? '__sm' : '__lg'
            }--content--footer-section--description`"
          >
            Let us find the ideal candidate for you, hassle-free Free resumes
            for your company vacancies!
          </div>
          <div
            :class="`custom-card${
              smAndDown ? '__sm' : '__lg'
            }--content--footer-section--footer`"
          >
            Unlock your perfect match!
          </div>
        </div>
        <!-- </div> -->
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="4"
        :class="`custom-card${smAndDown ? '__sm' : '__lg'}--content no-border`"
      >
        <div
          :class="`custom-card${
            smAndDown ? '__sm' : '__lg'
          }--content--label indigo`"
        >
          SIGNUP FOR FREE!
        </div>
        <div
          :class="`custom-card${
            smAndDown ? '__sm' : '__lg'
          }--content--top-title`"
        >
          Get matched today
        </div>

        <div
          :class="`custom-card${smAndDown ? '__sm' : '__lg'}--content--form`"
        >
          <div
            :class="`custom-card${
              smAndDown ? '__sm' : '__lg'
            }--content--form--item`"
          >
            <div
              :class="`custom-card${
                smAndDown ? '__sm' : '__lg'
              }--content--form--item--label`"
            >
              Name
            </div>
            <v-text-field
              v-model="user.name"
              rounded="0.375rem"
              color="#111827"
              base-color="#111827"
              width="100%"
              hide-details
              density="compact"
              variant="outlined"
            />
          </div>
          <div
            :class="`custom-card${
              smAndDown ? '__sm' : '__lg'
            }--content--form--item`"
          >
            <div
              :class="`custom-card${
                smAndDown ? '__sm' : '__lg'
              }--content--form--item--label`"
            >
              Phone
            </div>
            <v-text-field
              v-model="user.phone"
              rounded="0.375rem"
              color="#111827"
              base-color="#111827"
              width="100%"
              hide-details
              density="compact"
              variant="outlined"
            />
          </div>
          <div
            :class="`custom-card${
              smAndDown ? '__sm' : '__lg'
            }--content--form--item`"
          >
            <div
              :class="`custom-card${
                smAndDown ? '__sm' : '__lg'
              }--content--form--item--label`"
            >
              Email
            </div>
            <v-text-field
              v-model="user.email"
              rounded="0.375rem"
              color="#111827"
              base-color="#111827"
              width="100%"
              hide-details
              type="email"
              density="compact"
              variant="outlined"
            />
          </div>
          <div
            :class="`custom-card${
              smAndDown ? '__sm' : '__lg'
            }--content--form--item`"
          >
            <div
              :class="`custom-card${
                smAndDown ? '__sm' : '__lg'
              }--content--form--item--label`"
            >
              Upload
            </div>
            <div>
              <div
                v-if="!file"
                class="upload-container"
                @click="triggerFileUpload"
              >
                <input
                  ref="fileInput"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  style="display: none"
                  @change="handleFileUpload"
                />
                <div class="upload-box">
                  <div class="upload-icon">
                    <v-icon>advance:upload</v-icon>
                  </div>
                  <div>Click here to upload your files</div>
                </div>
              </div>

              <div v-else class="preview-container">
                <div class="close-icon" @click="removeFile">✖</div>
                <div v-if="isPdf(file.type)">
                  <iframe :src="file.url" width="100%" height="500px" />
                  <p>{{ file.name }}</p>
                </div>
                <div v-else class="document-icon-box">
                  <v-icon
                    color="black"
                    icon="mdi-file-document-check"
                    size="60"
                  />
                  <p>{{ file.name }}</p>
                </div>
              </div>
            </div>
          </div>
          <div
            :class="`custom-card${
              smAndDown ? '__sm' : '__lg'
            }--content--form--item`"
          >
            <div
              :class="`custom-card${
                smAndDown ? '__sm' : '__lg'
              }--content--form--item--label`"
            >
              Notice period
            </div>
            <v-text-field
              v-model="user.noticePeriod"
              rounded="0.375rem"
              color="#111827"
              base-color="#111827"
              width="100%"
              hide-details
              density="compact"
              variant="outlined"
            />
          </div>
          <div
            :class="`custom-card${
              smAndDown ? '__sm' : '__lg'
            }--content--form--item`"
          >
            <div
              :class="`custom-card${
                smAndDown ? '__sm' : '__lg'
              }--content--form--item--label`"
            >
              Expected salary
            </div>
            <v-text-field
              v-model="user.expectedSalary"
              rounded="0.375rem"
              color="#111827"
              base-color="#111827"
              width="100%"
              hide-details
              density="compact"
              variant="outlined"
            />
          </div>
          <div class="d-flex justify-center">
            <v-btn class="submit-btn" @click="submit">
              Let’s talk
              <template #append>
                <v-icon color="white">mdi-arrow-right-thin</v-icon>
              </template>
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
    <div :class="`line${smAndDown ? '__sm' : '__lg'}`" />

    <!-- Footer  -->
    <v-row no-gutters :class="`custom-footer${smAndDown ? '__sm' : '__lg'}`">
      <v-col
        cols="12"
        sm="12"
        md="4"
        style="text-align: left !important"
        :class="`custom-footer${smAndDown ? '__sm' : '__lg'}--content`"
      >
        <div :class="`custom-footer${smAndDown ? '__sm' : '__lg'}--title`">
          Contact
        </div>
        <div :class="`custom-footer${smAndDown ? '__sm' : '__lg'}--address`">
          Gulshan 2, Brighton Lane,Lake Forest, CA 92630
        </div>
        <div :class="`custom-footer${smAndDown ? '__sm' : '__lg'}--info`">
          Our offices are open 9am to 8pm (Monday to Friday)
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="4"
        style="text-align: center !important"
        :class="`custom-footer${smAndDown ? '__sm' : '__lg'}--content`"
      >
        <div :class="`custom-footer${smAndDown ? '__sm' : '__lg'}--title`">
          Need any support?
        </div>
        <div :class="`custom-footer${smAndDown ? '__sm' : '__lg'}--address`">
          Call to 16479, 09****8, 018****58
        </div>
        <div :class="`custom-footer${smAndDown ? '__sm' : '__lg'}--info`">
          demo@example.com
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="4"
        style="text-align: right !important"
        :class="`custom-footer${smAndDown ? '__sm' : '__lg'}--content`"
      >
        <div :class="`custom-footer${smAndDown ? '__sm' : '__lg'}--title`">
          Technical Support
        </div>
        <div :class="`custom-footer${smAndDown ? '__sm' : '__lg'}--address`">
          Kernelv5 Inc
        </div>
      </v-col>
    </v-row>
  </v-container>
  <teleport to="head">
    <meta name="keyword" content="advanced solution" />
    <meta name="description" content="Advanced Solution" />
    <component :is="'script'" type="application/ld+json">
      {{ jsonLd }}
    </component>
  </teleport>
</template>
