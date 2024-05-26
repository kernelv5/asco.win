<script setup lang="ts">
// import HelloWorld from '@/components/HelloWorld.vue';
import { useTheme, useDisplay } from 'vuetify';
import { ref } from 'vue';
import axios from 'axios';
const { width, smAndDown, mobile, mdAndUp } = useDisplay();

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

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

const form = ref();
const valid = ref(false);
const name = ref('');
const phone = ref('');
const email = ref('');
// const file = ref<File | null>(null);
const noticePeriod = ref('');
const expectedSalary = ref('');
const showFileRequired = ref(false);
const sendingEmailLoader = ref(false);

const sendEmail = () => {
  try {
    sendingEmailLoader.value = true;
    if(!file.value?.name){
      showFileRequired.value = true;
      toast.error('Please provide valid and required data.', {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
        pauseOnHover: true,
        closeButton: true,
        theme: 'colored',
      });
      throw new Error('Please upload your resume.');
    }
    if (
      !name.value ||
      !phone.value ||
      !noticePeriod.value ||
      !expectedSalary.value ||
      !file.value
    ) {
      toast.error('Please provide valid and required data.', {
        autoClose: 3000,
        position: toast.POSITION.TOP_CENTER,
        pauseOnHover: true,
        closeButton: true,
        theme: 'colored',
      });
      throw new Error('All fields are required.');
    }

    const data = {
      subject: `New application from ${name.value}`,
      html: `
        <p>Hi,</p>
        <p>My name is <b>${name.value}</b>,</p>
        <p>My phone number is <b>${phone.value}</b>,</p>
        <p>My email address is <b>${email.value}</b>,</p>
        <p>I've a notice period of <b>${noticePeriod.value}</b> and my expected salary is <b>${expectedSalary.value}</b>.</p>
        <p> I've attached my resume. I'm looking forward to hear from you.</p>
      `,
      attachments: [
        {
          filename: file.value?.name,
          content: file.value?.url?.split(',')[1],
        },
      ],
    };

    axios
      .post(`${import.meta.env.VITE_APP_API_SERVER}/send-email`, data)
      .then(response => {
        toast.success('Your application has been sent successfully!', {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
          pauseOnHover: true,
          closeButton: true,
          theme: 'colored',
        });
        sendingEmailLoader.value = false;
        form.value.reset();
        file.value = null;
        name.value = '';
        phone.value = '';
        email.value = '';
        noticePeriod.value = '';
        expectedSalary.value = '';
        showFileRequired.value = false;
      })
      .catch(error => {
        toast.error('Something went wrong', {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
          pauseOnHover: true,
          closeButton: true,
          theme: 'colored',
        });
        sendingEmailLoader.value = false;
      });
  } catch (error) {
    toast.error('Something went wrong', {
      autoClose: 3000,
      position: toast.POSITION.TOP_CENTER,
      pauseOnHover: true,
      closeButton: true,
      theme: 'colored',
    });
    sendingEmailLoader.value = false;
  }
};

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
    showFileRequired.value = false;
    reader.readAsDataURL(selectedFile);
  }
};

const getFileIcon = (fileType: string) => {
  if (fileType.includes('pdf')) return 'mdi-file-pdf-box';
  if (fileType.includes('msword')) return 'mdi-file-word-box';
  if (fileType.includes('wordprocessingml.document'))
    return 'mdi-file-word-box';
  return 'mdi-file';
};

const removeFile = () => {
  file.value = null;
  if (fileInput.value) {
    fileInput.value.value = '';
    showFileRequired.value = true;
  }
};
</script>

<template>
  <v-container style="max-width: 1440px; padding: unset !important">
    <div :class="`hero-title${smAndDown ? '__sm' : '__lg'}`">
      <span class="underline-text">Fast Track</span>
      <span>{{ '&nbsp;' }}Your Job Search</span>
      <span class="dot">.</span>
    </div>
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

        <!-- <div
          :class="`custom-card${smAndDown ? '__sm' : '__lg'}--content--form`"
        > -->
        <v-form
          ref="form"
          v-model="valid"
          @submit.prevent="sendEmail"
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
              v-model="name"
              :rules="[v => !!v || 'Name is required']"
              required
              rounded="0.375rem"
              color="#111827"
              base-color="#111827"
              width="100%"
              density="compact"
              variant="outlined"
            ></v-text-field>
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
              v-model="phone"
              required
              :rules="[v => !!v || 'Phone is required']"
              rounded="0.375rem"
              color="#111827"
              base-color="#111827"
              width="100%"
              density="compact"
              variant="outlined"
            ></v-text-field>
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
              <!-- <small>(optional)</small> -->
            </div>
            <v-text-field
              v-model="email"
              :rules="[v => /.+@.+/.test(v) || 'E-mail must be valid']"
              rounded="0.375rem"
              color="#111827"
              base-color="#111827"
              width="100%"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </div>
          <div
            :class="`custom-card${
              smAndDown ? '__sm' : '__lg'
            }--content--form--item`"
            style="padding-bottom: 1.25rem"
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
                :class="showFileRequired ? 'show-error' : 'show-normal'"
              >
                <input
                  type="file"
                  ref="fileInput"
                  @change="handleFileUpload"
                  accept=".pdf,.doc,.docx"
                  style="display: none;"
                />
                <div class="upload-box">
                  <div class="upload-icon">
                    <v-icon>advance:upload</v-icon>
                  </div>
                  <div>Click here to upload your files</div>
                </div>
              </div>

              <div v-else class="attachment-container">
                <div class="attachment">
                  <div>
                    <v-icon
                      size="x-large"
                      :icon="getFileIcon(file.type)"
                    ></v-icon>
                    <span class="pl-1">{{ file.name }}</span>
                  </div>
                  <div
                    style="
                      background: red;
                      border-radius: 100%;
                      height: 15px;
                      width: 15px;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                  >
                    <v-icon
                      color="white"
                      size="x-small"
                      class="pa-5 remove-icon"
                      @click="removeFile"
                    >
                      mdi-close
                    </v-icon>
                  </div>
                </div>
              </div>
              <div v-if="showFileRequired" style="color: #b00020; padding-inline: 16px; padding-top: 6px; font-size: 12px;">File is required and must be valid pdf or doc file.</div>
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
              v-model="noticePeriod"
              :rules="[v => !!v || 'Notice Period is required']"
              required
              rounded="0.375rem"
              color="#111827"
              base-color="#111827"
              width="100%"
              density="compact"
              variant="outlined"
            ></v-text-field>
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
              v-model="expectedSalary"
              :rules="[v => !!v || 'Expected Salary is required']"
              required
              rounded="0.375rem"
              color="#111827"
              base-color="#111827"
              width="100%"
              density="compact"
              variant="outlined"
            ></v-text-field>
          </div>
          <div class="d-flex justify-center">
            <!-- :disabled="!valid" -->
            <v-btn class="submit-btn" type="submit" :loading="sendingEmailLoader">
              Let’s talk
              <template v-slot:append>
                <v-icon color="white">mdi-arrow-right-thin</v-icon>
              </template>
            </v-btn>
          </div>
        </v-form>
        <!-- </div> -->
      </v-col>
    </v-row>
    <div :class="`line${smAndDown ? '__sm' : '__lg'}`"></div>

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