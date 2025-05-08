document.addEventListener('DOMContentLoaded', function () {
  const agentsData = {
    'COBALT': {
      name: 'COBALT',
      role: 'duelist',
      quote: '"Strike from the shadows, leave no trace."',
      bio: 'Cobalt is a high-mobility duelist specializing in rapid engagements and disengagements...',
      abilities: [
        { name: 'SHADOW DIVE', key: 'Q', description: 'Teleport a short distance...' },
        { name: 'PHANTOM STRIKE', key: 'E', description: 'Empowers your next 2 shots...' },
        { name: 'NIGHT SHROUD', key: 'C', description: 'Become invisible for 3 seconds...' },
        { name: 'SHADOW ASSAULT', key: 'X', description: 'Gain 3 charges of Shadow Dive...' }
      ],
      detailImage: '../Assets/Image/Agents/Cobalt-detail.png'
    },
    'EMBER': {
      name: 'EMBER',
      role: 'initiator',
      quote: '"Flash through the dark and blind them all."',
      bio: 'Ember specializes in blinding enemies and revealing their positions...',
      abilities: [
        { name: 'FLASHPOINT', key: 'Q', description: 'Launch a blinding projectile...' },
        { name: 'RADAR PULSE', key: 'E', description: 'Reveal enemy positions in a small area...' }
      ],
      detailImage: '../Assets/Image/Agents/Ember-detail.png'
    },
    'LYNX': {
      name: 'LYNX',
      role: 'controller',
      quote: '"Bend the cosmos to my will."',
      bio: 'Lynx manipulates gravity and space to control the battlefield...',
      abilities: [
        { name: 'GRAVITY WELL', key: 'Q', description: 'Pull enemies together in a small radius...' },
        { name: 'NEBULA', key: 'E', description: 'Create a smoke screen using cosmic energy...' }
      ],
      detailImage: '../Assets/Image/Agents/Lynx-detail.png'
    },
    'SPECTER': {
      name: 'SPECTER',
      role: 'sentinel',
      quote: '"Fortify and defend."',
      bio: 'Defensive specialist with fortifications...',
      abilities: [
        { name: 'BARRIER WALL', key: 'Q', description: 'Create impassable wall...' },
        { name: 'TRAPWIRE', key: 'E', description: 'Reveal and slow enemies...' }
      ],
      detailImage: '../Assets/Image/Agents/Specter-detail.png'
    },
    'IGNIS': {
      name: 'IGNIS',
      role: 'duelist',
      quote: '"Burn through the opposition."',
      bio: 'Close-range specialist with blade attacks...',
      abilities: [
        { name: 'BLADE FURY', key: 'Q', description: 'Melee combo attacks...' },
        { name: 'DASH SLASH', key: 'E', description: 'Lunge forward with attack...' }
      ],
      detailImage: '../Assets/Image/Agents/Ignis-detail.png'
    },
    'CRIMSON': {
      name: 'CRIMSON',
      role: 'initiator',
      quote: '"Hear everything, miss nothing."',
      bio: 'Sound-based recon and disruption expert...',
      abilities: [
        { name: 'SONIC BOOM', key: 'Q', description: 'Disorient enemies in area...' },
        { name: 'ECHO LOCATION', key: 'E', description: 'Reveal moving enemies...' }
      ],
      detailImage: '../Assets/Image/Agents/Crimson-detail.png'
    }
  };

  function filterAgentsByRole(role) {
    const grid = document.querySelector('.agents-grid');
    const cards = document.querySelectorAll('.agent-card');
    let anyShown = false;

    cards.forEach(card => {
      const agentName = card.querySelector('h3').textContent.trim().toUpperCase();
      const agent = agentsData[agentName];

      if (role === 'all' || agent.role === role) {
        card.style.display = '';
        anyShown = true;
      } else {
        card.style.display = 'none';
      }
    });

    const message = document.querySelector('.no-agents-message');
    if (!anyShown) {
      if (!message) {
        const noAgents = document.createElement('p');
        noAgents.className = 'no-agents-message';
        noAgents.textContent = 'No agents found for this role.';
        grid.appendChild(noAgents);
      }
    } else if (message) {
      message.remove();
    }
  }

  document.querySelectorAll('.role-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const selectedRole = this.getAttribute('data-role');
      filterAgentsByRole(selectedRole);
    });
  });

  function showAgentDetails(agentName, autoScroll = true) {
    const agent = agentsData[agentName];
    if (!agent) return;

    const detailsSection = document.querySelector('.agent-details');
    if (!detailsSection) return;

    const detailImg = detailsSection.querySelector('.details-image img');
    if (detailImg) {
      detailImg.src = agent.detailImage;
      detailImg.alt = agent.name;
    }

    detailsSection.querySelector('h1').textContent = agent.name;
    const roleTag = detailsSection.querySelector('.role-tag');
    roleTag.textContent = agent.role.toUpperCase();
    roleTag.className = 'role-tag ' + agent.role;
    detailsSection.querySelector('.quote').textContent = agent.quote;
    detailsSection.querySelector('.bio').textContent = agent.bio;

    const abilitiesContainer = detailsSection.querySelector('.full-abilities');
    abilitiesContainer.innerHTML = '';
    agent.abilities.forEach(ability => {
      const abilityElement = document.createElement('div');
      abilityElement.className = 'ability-full';
      abilityElement.innerHTML = `
        <h4>${ability.key} - ${ability.name}</h4>
        <p>${ability.description}</p>
      `;
      abilitiesContainer.appendChild(abilityElement);
    });

    if (autoScroll) {
      detailsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  document.querySelectorAll('.agent-card').forEach(card => {
    card.addEventListener('click', function () {
      const agentName = this.querySelector('h3').textContent.trim().toUpperCase();
      showAgentDetails(agentName);
    });
  });

  const hash = window.location.hash;
  if (Object.keys(agentsData).length > 0) {
    if (hash === '#agents') {
      showAgentDetails(Object.keys(agentsData)[0], true); 
    } else {
      showAgentDetails(Object.keys(agentsData)[0], false); 
    }
  }

  let lastWindowWidth = window.innerWidth;
  const baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

  function handleZoom() {
    const currentWidth = window.innerWidth;
    const widthDifference = Math.abs(currentWidth - lastWindowWidth);
    const zoomThreshold = 50;

    if (widthDifference > zoomThreshold) {
      adjustLayoutForZoom();
      lastWindowWidth = currentWidth;
    }
  }

  function adjustLayoutForZoom() {
    const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const zoomLevel = viewportWidth / window.outerWidth;

    document.documentElement.style.setProperty('--zoom-factor', Math.min(1, zoomLevel));
    const newFontSize = baseFontSize * Math.min(1.1, Math.max(0.9, zoomLevel));
    document.documentElement.style.fontSize = `${newFontSize}px`;

    if (/Mobi|Android/i.test(navigator.userAgent)) {
      const grid = document.querySelector('.agents-grid');
      if (zoomLevel < 0.9) {
        grid.style.gap = '10px';
      } else {
        grid.style.gap = '';
      }
    }
  }

  window.addEventListener('resize', handleZoom);
  window.addEventListener('load', () => {
    lastWindowWidth = window.innerWidth;
    adjustLayoutForZoom();
  });

  document.documentElement.style.transition = 'font-size 0.3s ease';
  document.querySelectorAll('.agent-card').forEach(card => {
    card.style.transition = 'transform 0.3s ease';
  });
});
