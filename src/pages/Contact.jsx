import { useForm, ValidationError } from "@formspree/react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export const Contact = () => {
  const [state, handleSubmit] = useForm("mzzaybeq");
  const [showPopup, setShowPopup] = useState(false);
  const formRef = useRef(null);

  const { t } = useTranslation();
  useEffect(() => {
    if (state.succeeded) {
      setShowPopup(true);
      formRef.current?.reset();
    }
  }, [state.succeeded]);
  return (
    <main className=" relative min-h-[150vh] mt-0 bg-[var(--LIGHT-CREAM)]">
      {showPopup && (
        <div
          className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="fixed top-65 left-1/2 -translate-x-1/2 bg-amber-50 px-5  py-6"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-center">{t("contact.submittedPopUp")}</p>
            <button
              className="absolute top-2 right-2 text-black"
              onClick={() => setShowPopup(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
      <section className="pt-25">
        <h2 className="text-[1.6rem] md:text-3xl text-center text-[var(--TITLE-COLOR)] mb-5">
          {t("contact.title")}
        </h2>
        <p className=" mt-10 text-center max-w-[80%] mx-auto font-semibold text-red-500">
          {t("contact.warningText")}
        </p>
      </section>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 w-[75%] sm:w-[70%] md:w-[55%] lg:w-[35%] mx-auto mt-15 bg-[var(--BG-BEIGE)] px-7 py-12 rounded-2xl shadow-xl"
      >
        <div className="relative">
          <input
            type="text"
            id="name"
            name="name"
            placeholder=" "
            required
            className="block w-full px-5 py-4 text-sm bg-[var(--LIGHT-CREAM)] rounded-xl border border-[var(--LIGHT-CREAM)] appearance-none focus:outline-none focus:ring-0 peer"
          />
          <ValidationError prefix="Name" field="name" errors={state.errors} />
          <label
            htmlFor="name"
            className="absolute text-sm text-[var(--TITLE-COLOR)] duration-300 transform -translate-y-4 scale-90 top-1 z-2 origin-[0] start-5 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-focus:scale-90 peer-focus:-translate-y-4"
          >
            {t("contact.inputLabel")}
          </label>
        </div>
        <div className="relative">
          <input
            type="email"
            name="email"
            id="mail"
            placeholder=" "
            required
            className="block w-full px-5 py-4 text-sm bg-[var(--LIGHT-CREAM)] rounded-xl border border-[var(--LIGHT-CREAM)] appearance-none focus:outline-none focus:ring-0 peer"
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
          <label
            htmlFor="mail"
            className="absolute text-sm text-[var(--TITLE-COLOR)] duration-300 transform -translate-y-4 scale-90 top-1 z-2 origin-[0] start-5 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-focus:scale-90 peer-focus:-translate-y-4"
          >
            {t("contact.emailLabel")}
          </label>
        </div>
        <div className="relative">
          <textarea
            name="message"
            id="message"
            placeholder=" "
            className="block w-full px-5 py-3 text-sm bg-[var(--LIGHT-CREAM)] min-h-[130px] rounded-xl border border-[var(--LIGHT-CREAM)] appearance-none focus:outline-none focus:ring-0 peer"
          ></textarea>
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />
          <label
            htmlFor="message"
            className="absolute text-sm text-[var(--TITLE-COLOR)] duration-300 transform -translate-y-4 scale-90 top-1 z-2 origin-[0] start-5 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-focus:scale-90 peer-focus:-translate-y-4"
          >
            {t("contact.messageLabel")}
          </label>
        </div>
        <button
          type="submit"
          disabled={state.submitting || state.succeeded}
          className={`self-center w-[150px] py-3 mt-5 rounded-xl disabled:cursor-not-allowed
            ${
              state.succeeded
                ? "bg-green-600 text-white"
                : "bg-[var(--BUTTON-BROWN)] text-[var(--LIGHT-CREAM)] hover:text-white"
            }`}
        >
          {state.submitting
            ? t("contact.submitting")
            : state.succeeded
            ? t("contact.submitted")
            : t("contact.submit")}
        </button>
      </form>
    </main>
  );
};
