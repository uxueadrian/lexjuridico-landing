/**
 * WhatsApp number of the firm, international format without "+" (wa.me style).
 * Confirmed client data: phone +52 777 240 2439 (spec).
 */
export const WHATSAPP_NUMBER = "527772402439";

/**
 * Builds a WhatsApp deep link with a URL-encoded Spanish prefill.
 *
 * @param message Plain-text Spanish message to prefill in the chat.
 * @returns Deep link: `https://wa.me/{WHATSAPP_NUMBER}?text={encodedMessage}`
 */
export const waLink = (message: string): string =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;