/**
 * True in the static GitHub Pages build, which has no server: the calendar
 * shows the sample schedule and the forms cannot store submissions.
 */
export const isStaticPreview = process.env.NEXT_PUBLIC_STATIC_PREVIEW === "1";

export const previewFormMessage =
  "This preview is not connected to a mailing list yet, so nothing was sent.";
