const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '../data');
const DATA_FILE = path.join(DATA_DIR, 'participants.json');

// Ensure data directory & file exist
function initStorage() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
  }
}

function getAllParticipants() {
  initStorage();
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error('Error reading participants file:', err);
    return [];
  }
}

function saveAllParticipants(participants) {
  initStorage();
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(participants, null, 2));
    return true;
  } catch (err) {
    console.error('Error writing participants file:', err);
    return false;
  }
}

function addParticipant(participantData) {
  const participants = getAllParticipants();
  participants.push(participantData);
  saveAllParticipants(participants);
  return participantData;
}

function updateParticipant(registrationId, updates) {
  const participants = getAllParticipants();
  const index = participants.findIndex(p => p.registrationId === registrationId);
  if (index === -1) return null;

  participants[index] = {
    ...participants[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };

  saveAllParticipants(participants);
  return participants[index];
}

function deleteParticipant(registrationId) {
  let participants = getAllParticipants();
  const initialLen = participants.length;
  participants = participants.filter(p => p.registrationId !== registrationId);
  if (participants.length !== initialLen) {
    saveAllParticipants(participants);
    return true;
  }
  return false;
}

function findParticipantById(registrationId) {
  const participants = getAllParticipants();
  return participants.find(p => p.registrationId === registrationId) || null;
}

module.exports = {
  getAllParticipants,
  saveAllParticipants,
  addParticipant,
  updateParticipant,
  deleteParticipant,
  findParticipantById
};
