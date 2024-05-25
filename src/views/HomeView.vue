<script setup lang="ts">
// import HelloWorld from '@/components/HelloWorld.vue';
import { useTheme, useDisplay } from 'vuetify';
import { ref } from 'vue';
import axios from 'axios';
const { width, smAndDown, mobile, mdAndUp } = useDisplay();
import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend';

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY || '',
});

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
  base64: any;
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

const sendEmail = () => {
  let data = JSON.stringify({
    from: {
      email: process.env.VITE_APP_MAILERSEND_FROM_EMAIL || '',
      name: process.env.VITE_APP_MAILERSEND_FROM_NAME || '',
    },
    to: [
      {
        email: email.value,
        name: name.value,
      },
    ],
    subject: `'New application from ${name.value}`,
    html: `<p>Hi,</p>
      <p>My name is <b>${name.value}</b>,</p>
      <p>My phone number is <b>${phone.value}</b>,</p> 
      <p>My email address is <b>${email.value}</b>,</p> 
      <p>I've a notice period of <b>${noticePeriod.value}</b> and my expected salary is <b>${expectedSalary.value}</b>.</p> 
      <p> I've attached my resume. I'm looking forward to hear from you.</p>`,
    attachments: [
      {
        filename: file.value?.name,
        content: file.value?.url?.split(',')[1],
      },
    ],
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: process.env.VITE_APP_MAILERSEND_API_URL || '',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.VITE_APP_MAILERSEND_API_KEY}` || '',
    },
    data: data,
  };

  axios
    .request(config)
    .then(response => {
      console.log(JSON.stringify(response.data));
    })
    .catch(error => {
      console.log(error);
    });
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
        base64: convertToBase64(selectedFile),
      };
    };
    reader.readAsDataURL(selectedFile);
  }
};

const convertToBase64 = (file: any) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    return reader?.result?.split(',')[1];
  };
  reader.onerror = error => {
    console.error('Error: ', error);
    return null;
  };
};

const removeFile = () => {
  file.value = null;
  if (fileInput.value) {
    fileInput.value.value = '';
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
          <v-form ref="form" v-model="valid" @submit.prevent="sendEmail" :class="`custom-card${smAndDown ? '__sm' : '__lg'}--content--form`">
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
                >
                  <input
                    type="file"
                    ref="fileInput"
                    @change="handleFileUpload"
                    accept="application/pdf"
                    style="display: none"
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
                  <iframe :src="file.url" width="100%" height="500px"></iframe>
                  <p>{{ file.name }}</p>
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
              <v-btn class="submit-btn" type="submit">
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