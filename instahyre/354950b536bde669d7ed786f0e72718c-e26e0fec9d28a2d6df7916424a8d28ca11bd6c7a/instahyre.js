(function () {
  let applyCount = 0;
  let intervalId = null;

  // Step 1: Open the initial modal by clicking "View job »"
  // Targets button element by class or fallback text-content check
  const viewButton = 
    document.querySelector('button.btn-interested, button.btn-success') ||
    Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.includes('View job'));

  if (viewButton) {
    viewButton.click();
    console.log('%c🚀 Clicked initial "View job" button', 'color: green; font-weight: bold;');
  } else {
    console.log('%c⚠️ "View job" button not found — checking if modal is already open.', 'color: orange; font-weight: bold;');
  }

  // Step 2: Loop execution to handle bulk and single application triggers
  setTimeout(() => {
    intervalId = setInterval(() => {
      // Selector 1: Modal "Apply to X jobs" Bulk Apply button
      const bulkApplyButton = document.querySelector('button[ng-click="applyBulk()"]');
      
      // Selector 2: Standard/Direct "Apply" button inside list cards or primary view
      const normalApplyButton = 
        document.querySelector('.apply[ng-click*="submitChoice"] .new-btn') ||
        document.querySelector('button[ng-click*="submitChoice"]') ||
        document.querySelector('button[ng-click*="apply"]');

      // Process Bulk Apply Modal
      if (bulkApplyButton && !bulkApplyButton.disabled) {
        bulkApplyButton.click();
        applyCount++;
        console.log(`%c✅ [${applyCount}] Bulk Apply clicked at ${new Date().toLocaleTimeString()}`, 'color: #0080FF; font-weight: bold;');
        return;
      }

      // Process Normal Single Apply
      if (normalApplyButton && !normalApplyButton.disabled) {
        normalApplyButton.click();
        applyCount++;
        console.log(`%c✅ [${applyCount}] Normal Apply clicked at ${new Date().toLocaleTimeString()}`, 'color: #008080; font-weight: bold;');
        return;
      }

      // Termination Condition: No clickable apply actions remaining
      console.log('%c🎉 All jobs processed or modal closed!', 'color: limegreen; font-size: 15px; font-weight: bold;');
      console.log(`%c🧾 Total Actions Executed: ${applyCount}`, 'color: #2196F3; font-weight: bold;');
      clearInterval(intervalId);
    }, 2500);
  }, 1000);
})();