'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useCurrentLocale } from 'next-i18n-router/client';
import i18nConfig from '@/i18nConfig';

export default function LanguageChanger() {
  const router = useRouter();
  const currentPathname = usePathname();
  const currentLocale = useCurrentLocale(i18nConfig);

  const handleChange = e => {
    const newLocale = e.target.value;

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    if (currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`));
    }

    router.refresh();
  };

  return (
    <div className="fixed bottom-0 right-0 flex items-center justify-center mr-10 mb-5">
    <select
      onChange={handleChange}
      value={currentLocale}
      className="px-3 py-2 border rounded-md bg-white shadow-md focus:outline-none"
    >
      <option value="en">English</option>
      <option value="uk">Ukrainian</option>
      <option value="eo">Spanish</option>
    </select>
  </div>
  
  );
}