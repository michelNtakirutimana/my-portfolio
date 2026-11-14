
"use strict";

/*
 * ==========================================
 * PORTFOLIO WEBSITE
 * Main JavaScript File
 * ==========================================
 */

// STEP 1: Application Initialization
document.addEventListener("DOMContentLoaded", () => {

    console.log("Portfolio JavaScript initialized successfully.");

    // Initialize website features
    initNavigation();
    initContactForm();

});


// STEP 2: Navigation System

function initNavigation() {

    // Select navigation elements
    const navigation = document.querySelector("header nav");
    const navigationLinks = document.querySelectorAll("header nav a");

    // Check whether navigation exists
    if (!navigation || navigationLinks.length === 0) {
        console.warn("Navigation elements were not found.");
        return;
    }

    // Get the current page filename
    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    // Identify the active navigation link
    navigationLinks.forEach((link) => {

        const linkPage = link.getAttribute("href");

        // Ignore empty links and external URLs
        if (!linkPage || linkPage.startsWith("http")) {
            return;
        }

        const linkFilename = linkPage.split("/").pop();

        if (linkFilename === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        } else {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
        }

    });

    console.log("Navigation system initialized.");

}


// STEP 3: EmailJS Contact Form

function initContactForm() {

    // Select existing form elements
    const contactForm = document.querySelector("#contact-form");
    const feedback = document.querySelector("#form-feedback");
    const sendButton = document.querySelector("#send-btn");

    // Check whether elements exist
    if (!contactForm || !feedback || !sendButton) {
        return;
    }

    // Check EmailJS availability
    if (typeof emailjs === "undefined") {
        console.error("EmailJS library was not loaded.");

        feedback.textContent =
            "Contact service is temporarily unavailable.";

        return;
    }

    // Initialize EmailJS
    emailjs.init({
        publicKey: "iwICgbdI0jopAdkLP"
    });

    // Handle form submission
    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        // Validate form
        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        // Prevent multiple submissions
        sendButton.disabled = true;
        sendButton.textContent = "Sending...";

        feedback.textContent = "Sending your message...";
        feedback.classList.remove("success", "error");

        try {

            // Send message through EmailJS
         const response = await emailjs.sendForm(
    "service_3t45vzq",
    "template_dmmnl6e",
    contactForm
);
            console.log(
                "Email sent successfully:",
                response.status,
                response.text
            );

            // Display success message
            feedback.textContent =
                "Your message has been sent successfully!";

            feedback.classList.add("success");

            // Reset form after successful sending
            contactForm.reset();

        } catch (error) {

            console.error("EmailJS sending error:", error);

            feedback.textContent =
                "Sorry! Your message could not be sent. Please try again.";

            feedback.classList.add("error");

        } finally {

            // Restore button
            sendButton.disabled = false;
            sendButton.textContent = "Send Message";

        }

    });

    console.log("EmailJS contact form initialized successfully.");

}
