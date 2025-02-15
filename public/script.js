function populateVoiceList() {
  if (typeof speechSynthesis === "undefined") {
    return;
  }

  // Check if voices are already available, if not, wait for them
  const voices = speechSynthesis.getVoices();
  
  if (voices.length === 0) {
    speechSynthesis.onvoiceschanged = function () {
      populateVoiceList(); // Recurse when voices are available
    };
    return; // Exit the function as voices aren't ready yet
  }

  // Clear the voiceSelect dropdown before adding new options
  const voiceSelect = document.getElementById("voiceSelect");
  voiceSelect.innerHTML = '';

  // Populate the dropdown with the available voices
  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    option.textContent = `${voices[i].name} (${voices[i].lang})`;
    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    voiceSelect.appendChild(option);
  }

  // Optionally, restore the previously selected voice
  restoreSelectedVoice(voices);
}

// Function to restore previously selected voice from localStorage
function restoreSelectedVoice(voices) {
  const savedVoice = localStorage.getItem("selectedVoice");
  if (savedVoice) {
    const matchingVoice = voices.find(voice => voice.name === savedVoice);
    if (matchingVoice) {
      const voiceSelect = document.getElementById('voiceSelect');
      const voiceOption = [...voiceSelect.options].find(option => option.getAttribute("data-name") === savedVoice);
      if (voiceOption) {
        voiceOption.selected = true;
      }
    }
  }
}

// Event listener to save the selected voice to localStorage
document.getElementById('voiceSelect').addEventListener("change", function () {
  const selectedVoice = document.getElementById('voiceSelect').selectedOptions[0].getAttribute("data-name");
  localStorage.setItem("selectedVoice", selectedVoice);
});

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", function () {
  populateVoiceList();
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
