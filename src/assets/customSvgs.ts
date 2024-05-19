import { createApp, h } from "vue";
import type { IconSet, IconProps } from "vuetify";
import uploadIcon from "@/components/icons/upload.vue";


const customSvgNameToComponent: Record<string, any> = {

  upload: uploadIcon,
};

const custom: IconSet = {
  component: (props: IconProps) =>
    h(props.tag, [h(customSvgNameToComponent[props.icon as string], { class: 'v-icon__svg' })]),
}


const app = createApp({});
app.component('uploadIcon', uploadIcon);

export { custom /* aliases */ };
