import { useEffect } from 'react';

const WHATSAPP_PHONE = '4917686192579';
const DISPLAY_PHONE = '+49 176 86192579';
const OLD_PHONE_PATTERNS = ['+212 675-585863', '+212675585863', '+212 675 585863'];

function updateWhatsAppLinks() {
  document.querySelectorAll<HTMLAnchorElement>('a[href*="wa.me/"]').forEach((link) => {
    const url = new URL(link.href);
    if (url.hostname === 'wa.me') {
      url.pathname = `/${WHATSAPP_PHONE}`;
      link.href = url.toString();
    }
  });
}

function updateDisplayedPhoneNumbers() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node: Node | null;

  while ((node = walker.nextNode())) {
    if (!node.textContent) continue;
    let updatedText = node.textContent;
    for (const oldPhone of OLD_PHONE_PATTERNS) {
      updatedText = updatedText.split(oldPhone).join(DISPLAY_PHONE);
    }
    if (updatedText !== node.textContent) node.textContent = updatedText;
  }
}

export function WhatsAppContactUpdater() {
  useEffect(() => {
    const updateContacts = () => {
      updateWhatsAppLinks();
      updateDisplayedPhoneNumbers();
    };

    updateContacts();
    const observer = new MutationObserver(updateContacts);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
