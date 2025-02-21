import Swal from 'sweetalert2';
import * as envConfig from 'virtual:config-loader';

import { type ModalStore } from '@/types/globals';
const {
  reporting: { REQUEST_URL },
  database: { DB_NAME },
} = envConfig;
import { attachEvent } from '@/utils';
const sendInquiry = (formValues: Record<string, string>) => {
  try {
    const values = {
      ...formValues,
      path: location.href,
      domain: window.location.host,
      DynamicDbConnectName: DB_NAME,
    };
    const url = new URL(REQUEST_URL);
    url.search = new URLSearchParams(values).toString();
    fetch(url);
    Swal.fire({
      title: 'Thank you for your message!',
      text: 'We have received your information and will get back to you as soon as possible.',
      icon: 'success',
      confirmButtonText: 'Okay',
      timer: 3000,
    });
  } catch (_) {
    console.log(_);
    Swal.fire({
      title: 'Submission failed',
      text: 'Something went wrong. Please try again later.',
      icon: 'error',
      confirmButtonText: 'Try again',
      timer: 3000,
    });
  }
};
const submit = () => {
  let isSubmitting = false;
  attachEvent('[data-form-submit]', 'submit', async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const formValues: Record<string, string> = {};

    for (const [key, value] of formData.entries()) {
      formValues[key] = value as string;
    }
    const formType =
      (e.currentTarget as HTMLFormElement).getAttribute('data-type') ||
      'download';

    switch (formType) {
      case 'download':
        await acitonDownload(formValues);
        break;
      case 'search':
        await search(formValues?.keywords);
        break;
      case 'origin-search':
        window.open(
          `https://www.welongoiltools.com/search/${formValues?.keywords}.html`,
          '_blank'
        );
        break;
      case 'send-inquiry':
        sendInquiry(formValues);
        break;
      default:
        break;
    }
    setTimeout(() => {
      isSubmitting = false;
    }, 3000);
    try {
      (window.Alpine?.store('modal') as ModalStore).closeAll();
    } catch (_) {
      console.log(_);
    }
    form.reset();
  });
};
const search = (str: string) => {
  const url = `${window.location.origin}/search?keywords=${encodeURIComponent(str)}`;
  window.open(url, '_blank');
};
const acitonDownload = async (formValues: Record<string, string>) => {
  sendInquiry(formValues); // 不用等
  const filename = window?.filename;
  const url = window?.url;

  if (url && filename) {
    downloadFile(url, filename);
  }
};

const downloadFile = (url: string, fileName: string): void => {
  const a = document.createElement('a');

  a.href = url;

  a.download = fileName;

  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
// window.addEventListener('DOMContentLoaded', submit);
window.addEventListener('load', submit);
// window.onload = submit;
export { submit };
