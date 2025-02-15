document.addEventListener("DOMContentLoaded", function () {
  const voiceSelect = document.getElementById("voiceSelect");

  // Function to populate the voices dropdown
  function populateVoiceList() {
    if (typeof speechSynthesis === "undefined") {
      console.warn("Speech Synthesis is not supported.");
      return;
    }

    // Get the available voices
    const voices = speechSynthesis.getVoices();

    // Clear existing options
    voiceSelect.innerHTML = '';

    // Populate the dropdown with voices
    voices.forEach(function (voice) {
      const option = document.createElement("option");
      option.textContent = `${voice.name} (${voice.lang})`; // Display name and language
      option.setAttribute("data-lang", voice.lang);
      option.setAttribute("data-name", voice.name);
      voiceSelect.appendChild(option);
    });

    // Restore selected voice after voices are populated
    restoreSelectedVoice(voices);
  }

  // Function to restore the previously selected voice
  function restoreSelectedVoice(voices) {
    const savedVoice = localStorage.getItem("selectedVoice");
    if (savedVoice) {
      // Find the voice that matches the saved value
      const matchingVoice = voices.find(voice => voice.name === savedVoice);
      if (matchingVoice) {
        // Set the voice in the dropdown by matching the option
        const voiceOption = [...voiceSelect.options].find(option => option.getAttribute("data-name") === savedVoice);
        if (voiceOption) {
          voiceOption.selected = true; // Select the matching voice
        }
      }
    }
  }

  // Wait for the voices to be populated or listen for the onvoiceschanged event
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = function () {
      populateVoiceList();
    };
  } else {
    // If the voices are already available, populate the dropdown immediately
    populateVoiceList();
  }

  // Listen for changes to the dropdown and save the selected voice to localStorage
  voiceSelect.addEventListener("change", function () {
    const selectedVoice = voiceSelect.options[voiceSelect.selectedIndex].getAttribute("data-name");
    localStorage.setItem("selectedVoice", selectedVoice);
  });
});


document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("channelname");

    // Load previous value
    input.value = localStorage.getItem("twitch_channel") || "";

    // Save on change
    input.addEventListener("input", function () {
        localStorage.setItem("twitch_channel", input.value);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const skipCommandCheckbox = document.getElementById("modsonly");

    skipCommandCheckbox.checked = localStorage.getItem("modsonly") === "true";

    skipCommandCheckbox.addEventListener("change", function () {
        localStorage.setItem("modsonly", skipCommandCheckbox.checked);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const skipCommandCheckbox = document.getElementById("announcechatter");

    skipCommandCheckbox.checked = localStorage.getItem("announcechatter") === "true";

    skipCommandCheckbox.addEventListener("change", function () {
        localStorage.setItem("announcechatter", skipCommandCheckbox.checked);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const excludeToggle = document.getElementById("exclude-toggle");
    const excludeOptions = document.getElementById("exclude-options");
    const excludedChatters = document.getElementById("excluded-chatters");

    const isExcluded = localStorage.getItem("excludeEnabled") === "true";
    excludeToggle.checked = isExcluded;
    excludeOptions.classList.toggle("d-none", !isExcluded);

    const defaultChatters = [
        "Nightbot", "Moobot", "StreamElements", "Streamlabs", "Fossabot"
    ];

    const savedChatters = localStorage.getItem("excludedChatters");
    if (savedChatters !== null) {
        excludedChatters.value = savedChatters;
    } else {
        excludedChatters.value = defaultChatters.join("\n");
    }

    excludeToggle.addEventListener("change", function () {
        const isChecked = excludeToggle.checked;
        localStorage.setItem("excludeEnabled", isChecked);
        excludeOptions.classList.toggle("d-none", !isChecked);
    });

    excludedChatters.addEventListener("input", function () {
        localStorage.setItem("excludedChatters", excludedChatters.value);
    });
});


function fillInBots() {
    const excludedChatters = document.getElementById("excluded-chatters");
    const knownBots = [
        "Nightbot", "Moobot", "StreamElements", "Streamlabs", "Fossabot"
    ];


    const currentChatters = excludedChatters.value.trim().split("\n").filter(line => line.trim() !== "");
    const uniqueChatters = new Set(currentChatters.concat(knownBots));


    excludedChatters.value = Array.from(uniqueChatters).join("\n");
    localStorage.setItem("excludedChatters", excludedChatters.value);
}


document.addEventListener("DOMContentLoaded", function () {
    const skipCommandCheckbox = document.getElementById("skipcommand");


    skipCommandCheckbox.checked = localStorage.getItem("skipcommand") === "true";


    skipCommandCheckbox.addEventListener("change", function () {
        localStorage.setItem("skipcommand", skipCommandCheckbox.checked);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const skipCommandCheckbox = document.getElementById("skiplinks");


    skipCommandCheckbox.checked = localStorage.getItem("skiplinks") === "true";


    skipCommandCheckbox.addEventListener("change", function () {
        localStorage.setItem("skiplinks", skipCommandCheckbox.checked);
    });
});