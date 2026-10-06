(async () => {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const waitForElement = async (selector, timeout = 5000) => {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      const el = document.querySelector(selector);
      if (el) return el;
      await delay(100);
    }
    return null;
  };

  const applicationText = `Hey there,

I'm Akshay, an AI/ML Engineer and BCA Data Science student focused on building practical AI-powered products, automation systems, and full-stack applications.

I have hands-on experience working across AI/ML engineering, Generative AI, LLM applications, RAG pipelines, AI agents, automation, backend development, and modern web/mobile technologies. I've worked on real-world projects and internships where I’ve taken features from development to deployment and worked across both AI and software engineering.

My core areas of experience include:

1. AI/ML Engineering — Python, Machine Learning, Deep Learning, Computer Vision, NLP, Transformers, and practical AI application development.
2. Generative AI & LLMs — OpenAI, Claude, Gemini, Llama, Qwen, DeepSeek, Ollama, Hugging Face, prompt engineering, LLM integration, and AI agents.
3. RAG & AI Systems — Built RAG-based systems using document chunking, embeddings, vector databases, retrieval pipelines, and LLMs.
4. AI Automation — Built automation workflows, chatbots, and AI-powered systems using n8n, APIs, Docker, and LLM-based workflows.
5. Backend Engineering — Python, FastAPI, Flask, REST APIs, PostgreSQL, Supabase, MongoDB, Firebase, and backend integrations.
6. Full-Stack Development — JavaScript, React, Next.js, React Native, Tailwind CSS, and modern web/mobile application development.
7. Computer Vision — Worked on facial recognition and voice/embedding-based systems, including an AI-powered attendance system.
8. Cloud & DevOps — Docker, Git, GitHub, CI/CD, Vercel, local deployments, API integrations, and production-oriented development.

Some of the projects I've worked on include:

• AI-Powered Attendance System — Built an attendance platform using facial recognition and voice recognition/embeddings, with similarity-based verification and separate teacher/student workflows.

• RAG Chat System — Built a ChatGPT-style documentation assistant using document chunking, embeddings, vector search, and LLMs to provide contextual answers.

• AI Automation Systems — Built automation workflows and website chatbots using n8n, APIs, Docker, and LLM integrations, including automation workflows for social media interactions.

• A-Game — Currently working as an AI/software engineering intern at Mapaan AI, contributing to "A Game - Date Better", an Expo/React Native mobile application and its AI-powered features, authentication, backend integrations, monetization, and production deployment.

• Model Photoshoot — Currently contributing to a Next.js-based AI product involving AI-powered model/garment workflows, prompt-based generation, and modern web application architecture.

My current technical stack includes:

AI / ML:
Python, Machine Learning, Deep Learning, Computer Vision, NLP, Transformers, Hugging Face, Scikit-learn, TensorFlow, PyTorch

Generative AI:
OpenAI, Claude, Gemini, Llama, Qwen, DeepSeek, Ollama, Prompt Engineering, LLM Integration, AI Agents, MCP

AI Engineering:
LangChain, LangGraph, RAG Pipelines, Embeddings, Vector Search, FAISS, ChromaDB, Supabase Vector, PostgreSQL

Backend:
FastAPI, Flask, REST APIs, Python, PostgreSQL, Supabase, MongoDB, Firebase

Frontend / Mobile:
JavaScript, React.js, Next.js, React Native, Expo, Tailwind CSS

Automation:
n8n, API Automation, AI Workflows, Chatbots, Docker

DevOps & Tools:
Docker, Git, GitHub, CI/CD, Vercel, Postman, Jupyter Notebook

I'm particularly interested in opportunities where I can work on AI/ML engineering, Generative AI, LLM applications, AI agents, RAG systems, computer vision, intelligent automation, and AI-powered products.

I'm continuously improving my skills in AI engineering and software development with the goal of building production-ready AI systems rather than just experimenting with models.

🔗 Links to learn more about my work:

GitHub: https://github.com/AKSHAY-MORE10
LinkedIn: https://www.linkedin.com/in/akshaymore10/
Portfolio: https://www.akshaybapumore.in/
Instagram: https://www.instagram.com/akshay.overfit

Hope my background fits the role. Looking forward to hearing from you!`;

  let appliedCount = 0;
  let skippedCount = 0;
  let scrollCount = 0;
  let processedButtons = new Set();

  console.log(`%c🚀 Starting smart auto-apply on Wellfound...`, 'color: green; font-weight: bold;');

  const handleRelocationQuestion = async () => {
      try {
          const firstRadio = document.querySelector(
              'input[name="qualification.location.action"]'
          )
          if (firstRadio) {
              firstRadio.click()
              console.log("%c📍 Selected relocation option", "color: orange")
          }

          // Targeting the dropdown specifically by ID
          const dropdownContainer = document.querySelector(
              "#form-input--qualification.location.locationId .select__control"
          )
          if (dropdownContainer) {
              dropdownContainer.click()
              console.log("%c🔽 Opened location dropdown", "color: orange")
              await delay(500)

              const firstOption = document.querySelector(
                  ".select__menu-list div"
              )
              if (firstOption) {
                  firstOption.click()
                  console.log(
                      "%c🌍 Selected first location in dropdown",
                      "color: orange"
                  )
              }

              await delay(2000)
              return true
          } else {
              console.log("%c⚠️ Dropdown not found", "color: gray")
          }
      } catch (err) {
          console.log(
              "%c❌ Error while handling relocation question",
              "color: red",
              err
          )
      }
      return false
  }

  const handleCustomQuestions = () => {
      const allGroups = document.querySelectorAll(
          '[data-test^="RadioGroup-customQuestionAnswers"]'
      )

      allGroups.forEach((group) => {
          const options = group.querySelectorAll('input[type="radio"]')
          if (options.length === 3) {
              options[1].click() // middle
              console.log(
                  "%c🎯 Selected Intermediate for 3-option question",
                  "color: dodgerblue"
              )
          } else if (options.length === 2) {
              options[0].click() // first
              console.log(
                  "%c🎯 Selected Beginner for 2-option question",
                  "color: dodgerblue"
              )
          } else {
              console.log(
                  "%c⚠️ Unexpected number of options: " + options.length,
                  "color: gray"
              )
          }
      })
  }

  const processBatch = async () => {
    let buttons = [...document.querySelectorAll('button[data-test="LearnMoreButton"]')];
    buttons = buttons.filter(btn => !processedButtons.has(btn));

    if (buttons.length === 0) return false;

    for (let i = 0; i < buttons.length; i++) {
      const learnMoreBtn = buttons[i];
      processedButtons.add(learnMoreBtn);

      learnMoreBtn.scrollIntoView({ behavior: "smooth", block: "center" });
      await delay(300);
      learnMoreBtn.click();
      console.log(`%c🔍 [${appliedCount + skippedCount + 1}] Opened job modal...`, 'color: blue');

      const applyBtn = await waitForElement('button[data-test="JobDescriptionSlideIn--SubmitButton"]');
      if (!applyBtn) {
        console.log('%c❌ Modal failed to load', 'color: red');
        skippedCount++;
        continue;
      }

      // If apply button is disabled, skip fast
      if (applyBtn.disabled) {
        // Step 1: Handle relocation questionnaire if visible
        const isFormFilled = await handleRelocationQuestion()

        if (isFormFilled) {
          console.log('%c✅ Relocation questionnaire filled', 'color: green');     
        } else {
          console.log('%c⚠️ Relocation questionnaire not filled', 'color: orange');
          console.log("%c⏭️ Apply button is disabled — skipping", "color: gray")
        }

        const closeBtn = await waitForElement('button[data-test="closeButton"]');
        if (closeBtn) closeBtn.click();
        skippedCount++;
        await delay(500);
        continue;
      }

      handleCustomQuestions()

      // Step 2: Fill application text
      const textarea = document.querySelector('textarea:not([disabled])');
      if (textarea) {
        textarea.value = applicationText;
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
        console.log(`%c📝 Autofilled application`, 'color: purple');
      }

      await delay(1000)

      // Step 3: Click Apply
      applyBtn.click();
      await delay(3000)
      appliedCount++;
      console.log('%c✅ Applied successfully', 'color: teal');

      // Step 4: Close modal
      const closeBtn = await waitForElement('button[data-test="closeButton"]');
      if (closeBtn) {
        closeBtn.click();
        console.log('%c❎ Modal closed', 'color: crimson');
      }

      await delay(1000);
    }

    return true;
  };

  // Infinite scroll loop
  const maxScrolls = 10;
  while (scrollCount < maxScrolls) {
    const found = await processBatch();
    if (!found) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      console.log(`%c📜 Scrolling to load more jobs...`, 'color: darkcyan');
      scrollCount++;
      await delay(2000);
    } else {
      scrollCount = 0; // reset if found new jobs
    }
  }

  // Summary
  console.log('%c🎉 All done! Smart auto-apply finished.', 'color: limegreen; font-size: 16px; font-weight: bold;');
  console.log(`%c📌 Jobs Applied: ${appliedCount}`, 'color: #4CAF50; font-weight: bold;');
  console.log(`%c📌 Jobs Skipped: ${skippedCount}`, 'color: #FF9800; font-weight: bold;');
})();