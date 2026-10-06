/**
 * Auto-Apply Automation Script for Uplers Platform (With Advanced DOM Scroll & Event Dispatch)
 * Run directly inside Chrome / Browser DevTools Console.
 */

(() => {
  let appliedCount = 0;
  let processing = false;
  let scrollAttempts = 0;
  const MAX_SCROLL_ATTEMPTS = 4;
  const ACTION_DELAY = 2500; // Delay between sequence steps (ms)

  console.log('%c🚀 Starting Uplers Auto-Apply Script with Advanced Scroll...', 'color: #00E676; font-weight: bold; font-size: 14px;');

  // Helper to trigger a real user click event on React/Vue single-page apps
  const triggerRealClick = (element) => {
    if (!element) return;
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    element.dispatchEvent(clickEvent);
  };

  // Dispatch mouse wheel events to trigger custom virtualized list scroll listeners
  const triggerWheelScroll = (targetContainer) => {
    if (!targetContainer) return;
    const wheelEvent = new WheelEvent('wheel', {
      bubbles: true,
      cancelable: true,
      deltaY: 1000,
      deltaMode: 0
    });
    targetContainer.dispatchEvent(wheelEvent);
  };

  const runAutomationStep = () => {
    if (processing) return;
    processing = true;

    // 1. Locate current active job card
    let currentCard = document.querySelector('.jobListSection .list .jobCardContainer.active');
    
    if (!currentCard) {
      // Pick first unapplied card container
      const cards = Array.from(document.querySelectorAll('.jobListSection .list .jobCardContainer'));
      currentCard = cards.find(card => !card.querySelector('.oppHeadActionTag'));
      
      if (currentCard) {
        const clickTarget = currentCard.querySelector('.jobTitle') || currentCard.querySelector('.jobCard') || currentCard;
        triggerRealClick(clickTarget);
        console.log('%c📍 Selected next available job card.', 'color: #29B6F6;');
        setTimeout(() => { processing = false; }, 1000);
        return;
      }
    }

    // 2. Check if the currently active card is already applied
    if (currentCard && currentCard.querySelector('.oppHeadActionTag')) {
      console.log('%c⏭️ Current job already applied. Moving to next job card...', 'color: #FFA726;');
      advanceToNextCard(currentCard);
      return;
    }

    // 3. Handle Radio Questions (Select "YES" automatically if asked)
    const radioContainers = document.querySelectorAll('.radioFlex');
    radioContainers.forEach(container => {
      const yesLabel = Array.from(container.querySelectorAll('label.radioInput'))
        .find(label => label.textContent.trim().toLowerCase().includes('yes'));

      if (yesLabel) {
        const input = yesLabel.querySelector('input[type="radio"]') || yesLabel;
        if (input && !input.checked) {
          triggerRealClick(input);
          console.log('%c🔘 Auto-selected "YES" for confirmation question.', 'color: #FFEB3B; font-weight: bold;');
        }
      }
    });

    // 4. Check for Modal Submit Button (Step 3 in user flow)
    const modalSubmitBtn = document.querySelector('.bottomActions input.primaryBtn.cta[type="submit"]');
    if (modalSubmitBtn && isElementVisible(modalSubmitBtn)) {
      triggerRealClick(modalSubmitBtn);
      appliedCount++;
      console.log(`%c✅ [${appliedCount}] Submitted application inside modal!`, 'color: #00E676; font-weight: bold;');

      // Wait for submission to complete, then close modal and advance
      setTimeout(() => {
        const closeBtn = document.querySelector('button.modalCloseBtn');
        if (closeBtn) {
          triggerRealClick(closeBtn);
          console.log('%c✖️ Closed application modal.', 'color: #B0BEC5;');
        }
        
        // Re-query current active card to advance safely
        const updatedActive = document.querySelector('.jobListSection .list .jobCardContainer.active') || currentCard;
        advanceToNextCard(updatedActive);
      }, ACTION_DELAY);
      return;
    }

    // 5. Click Primary "Apply Now" Button on Job Details (Step 2 in user flow)
    const applyNowBtn = document.querySelector('.actionBtns .primary button.applyBtn');
    if (applyNowBtn && isElementVisible(applyNowBtn) && !applyNowBtn.disabled) {
      triggerRealClick(applyNowBtn);
      console.log('%c📩 Clicked main "Apply Now" button. Waiting for modal...', 'color: #29B6F6;');
      setTimeout(() => { processing = false; }, 1200);
      return;
    }

    // 6. Fallback scroll check if no active cards or buttons are found
    scrollAndLoadMore();
  };

  // Helper function to advance focus to the next card or scroll for more
  const advanceToNextCard = (activeCard) => {
    const allCards = Array.from(document.querySelectorAll('.jobListSection .list .jobCardContainer'));
    const currentIndex = allCards.indexOf(activeCard);

    if (currentIndex !== -1 && currentIndex + 1 < allCards.length) {
      scrollAttempts = 0;
      const nextCard = allCards[currentIndex + 1];
      
      // Auto-scroll the specific card into view before clicking it
      nextCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

      const clickTarget = nextCard.querySelector('.jobTitle') || nextCard.querySelector('.jobCard') || nextCard;
      triggerRealClick(clickTarget);
      console.log(`%c🔄 Switched to Job Card #${currentIndex + 2}`, 'color: #AB47BC;');
      
      setTimeout(() => { processing = false; }, 1500);
    } else {
      scrollAndLoadMore();
    }
  };

  // Helper function to force list container scroll and load new cards
  const scrollAndLoadMore = () => {
    scrollAttempts++;
    console.log(`%c📜 Reached end of loaded cards. Forcing scroll & DOM update (Attempt ${scrollAttempts}/${MAX_SCROLL_ATTEMPTS})...`, 'color: #FF9800; font-weight: bold;');

    const listContainer = document.querySelector('.jobListSection .list') || document.querySelector('.jobListSection');
    const allCards = Array.from(document.querySelectorAll('.jobListSection .list .jobCardContainer'));
    const lastCard = allCards[allCards.length - 1];

    if (lastCard) {
      // 1. Smoothly scroll last card into view to hit trigger boundaries
      lastCard.scrollIntoView({ behavior: 'auto', block: 'end' });
    }

    if (listContainer) {
      // 2. Set scroll offsets explicitly
      listContainer.scrollTop = listContainer.scrollHeight;
      
      // 3. Dispatch simulated wheel event to trigger React scroll listeners
      triggerWheelScroll(listContainer);
    }

    // 4. Fallback: Scroll entire window to bottom
    window.scrollTo(0, document.body.scrollHeight);

    // Wait 3.5 seconds for API call to deliver new DOM items
    setTimeout(() => {
      const updatedCards = Array.from(document.querySelectorAll('.jobListSection .list .jobCardContainer'));
      const activeCard = document.querySelector('.jobListSection .list .jobCardContainer.active');
      const currentIndex = updatedCards.indexOf(activeCard);

      if (updatedCards.length > allCards.length) {
        console.log(`%c✨ Loaded ${updatedCards.length - allCards.length} new jobs! Resuming automation...`, 'color: #00E676; font-weight: bold;');
        scrollAttempts = 0;
        advanceToNextCard(activeCard || updatedCards[allCards.length]);
      } else if (currentIndex !== -1 && currentIndex + 1 < updatedCards.length) {
        scrollAttempts = 0;
        advanceToNextCard(updatedCards[currentIndex]);
      } else if (scrollAttempts < MAX_SCROLL_ATTEMPTS) {
        processing = false;
      } else {
        finishExecution();
      }
    }, 3500);
  };

  // Helper function to finish script execution cleanly
  const finishExecution = () => {
    console.log('%c🎉 All available jobs processed & no more jobs to load.', 'color: #00E676; font-size: 15px; font-weight: bold;');
    console.log(`%c🧾 Total Applications Submitted: ${appliedCount}`, 'color: #FFF; background: #1E88E5; padding: 6px 12px; border-radius: 4px; font-size: 13px;');
    clearInterval(intervalId);
  };

  // Helper utility to check element visibility in DOM
  const isElementVisible = (elem) => {
    return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
  };

  // Execute sequence interval
  const intervalId = setInterval(runAutomationStep, ACTION_DELAY);
})();