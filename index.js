const axios = require('axios');

// --- YOUR STUFF HERE ---
const TOKENS = ["TOKEN_1", "TOKEN_2"]; // Add as many as you want
const CHANNEL_ID = "YOUR_CHANNEL_ID"; 
const INTERVAL_SECONDS = 60; // Sends a random msg every 60 seconds

const MESSAGES = [
  "cant win any gws lol", "cant level up lol", "so close to next level", "need more gems man", "the grind is real 💀",
  "finally got some exp", "this chest was mid", "so many gems wow", "gg to whoever won", "how much exp for level 10",
  "i need gems bad", "no luck today", "why is leveling so hard", "lol finally leveled up", "bruh my luck is bad",
  "open more chests guys", "ggs", "i need more exp", "almost there", "gems gems gems", "still at level 5",
  "that gw was fast", "lol no gems left", "back to grinding", "exp is so slow today", "hope i win next time",
  "chest luck is mid", "lol gg", "i want that chest", "how do i get more gems", "grinding for hours lol",
  "finally some gems", "lvl 20 soon", "bruh 💀", "wish i won that", "more exp pls", "gems are life",
  "why am i so unlucky", "lol level up", "chest was okay", "need gems for ps99", "ggs only", "cant wait to level",
  "exp grind is crazy", "lol my gems", "wish i had luck", "gws are hard to win", "level 15 lets go", "so many chests",
  "i need that win lol", "bruh no gems", "just chatting for exp", "exp check", "lol so close", "ggs man",
  "no luck again", "chest luck pls", "grind never stops", "i need 1k gems", "level up finally", "lol my luck is 0",
  "ggs to the winner", "exp pls", "almost lvl 10", "need more gems", "bruh this chest", "lol no way",
  "grinding gems now", "so much exp", "gg guys", "i need a win", "chest was bad lol", "lvl 50 soon",
  "lol i need gems", "exp grind today", "bruh why me", "ggs for real", "i want gems", "no luck today lol",
  "level up soon", "lol this server", "need gems fast", "exp is okay", "ggs only lol", "chest grind",
  "lol my exp", "so many gems", "i need a gw win", "bruh leveling is slow", "level 12 lets go", "lol no luck",
  "ggs to everyone", "need exp badly", "chest was trash", "lol gems", "grinding all day", "level up now",
  "bruh no luck", "ggs win", "i need gems man", "lol chest", "exp grind lol", "finally level 5", "so close now",
  "bruh gems", "ggs man lol", "no win again", "chest luck zero", "lol level", "i want exp", "need gems now",
  "grinding gems lol", "bruh my luck", "ggs to you", "level up check", "lol so many gems", "exp is slow",
  "i need luck", "chest was mid lol", "bruh finally", "ggs only man", "no gems lol", "leveling up now",
  "lol exp", "i want gems fast", "chest grind lol", "bruh no way", "ggs ggs", "level 8 lets go", "lol my luck",
  "need exp fast", "gems gems", "bruh chest", "ggs lol", "no luck today man", "level up soon lol",
  "i need gems badly", "exp check lol", "bruh so close", "ggs winner", "no win lol", "chest luck pls",
  "lol leveling", "grinding now", "bruh gems lol", "ggs only lol", "i need exp", "level up check", "lol no gems",
  "chest was okay lol", "bruh luck", "ggs man", "no luck again lol", "leveling is hard", "lol exp grind",
  "i want gems", "chest luck 0", "bruh finally level 10", "ggs ggs ggs", "no gems left lol", "level up pls",
  "lol my gems", "exp is fine", "i need a win man", "bruh chest luck", "ggs to all", "no win today",
  "level up fast", "lol so close to 20", "need more gems lol", "bruh exp", "ggs only", "no luck man",
  "chest was mid", "lol gems gems", "i want exp fast", "level up soon", "bruh no luck lol", "ggs winner man",
  "no gems now", "grinding exp lol", "lol my luck is bad", "chest grind now", "bruh level", "ggs only ggs",
  "no win lol bruh", "level 15 soon", "lol exp check", "i need gems fast", "chest was bad", "bruh no gems lol",
  "ggs to him", "no luck lol man", "level up lol", "lol chest luck", "i want gems now", "exp is so slow lol",
  "bruh so close now", "ggs ggs lol", "no gems left", "level up check 1", "lol my luck 0", "chest grind man",
  "bruh gems fast", "ggs only win", "no win again bruh", "leveling is slow lol", "lol exp now", "i need more luck",
  "chest was okay", "bruh no gems man", "ggs to the winner lol", "no luck man 💀", "level up finally lol",
  "lol chest was mid", "i want exp now lol", "grinding for gems", "bruh my exp", "ggs only ggs lol",
  "no gems today", "leveling up check", "lol so close lvl 30", "chest grind lol man", "bruh luck check",
  "ggs ggs winner", "no win lol sad", "level up soon man", "lol my gems gone", "exp check now",
  "i need gems badly lol", "chest was trash lol", "bruh no luck again", "ggs to everyone lol",
  "no gems man bruh", "level is a grind", "lol exp fast", "i want to win lol", "chest luck pls man",
  "bruh level up", "ggs only lol man", "no luck today bruh", "level 10 finally", "lol so many gems wow",
  "exp grind check", "i need luck man", "chest was mid lol bruh", "bruh gems check", "ggs ggs ggs lol",
  "no win again lol", "level up now lol"
];

// --- THE WORKER ---

async function startGrind() {
  const msg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
  for (const token of TOKENS) {
    try {
      await axios.post(`https://discord.com/api/v10/channels/${CHANNEL_ID}/messages`, { content: msg }, { headers: { Authorization: token } });
      console.log(`[${new Date().toLocaleTimeString()}] Sent: ${msg}`);
      await new Promise(r => setTimeout(r, 2500)); // Gap between accounts
    } catch (e) { console.log("Error sending msg"); }
  }
}

async function checkReactions() {
  try {
    const res = await axios.get(`https://discord.com/api/v10/channels/${CHANNEL_ID}/messages?limit=1`, { headers: { Authorization: TOKENS[0] } });
    const last = res.data[0];
    if (last && last.reactions) {
      for (const r of last.reactions) {
        const emoji = r.emoji.id ? `${r.emoji.name}:${r.emoji.id}` : r.emoji.name;
        for (const token of TOKENS) {
          await new Promise(res => setTimeout(res, Math.random() * 2000 + 1000));
          await axios.put(`https://discord.com/api/v10/channels/${CHANNEL_ID}/messages/${last.id}/reactions/${encodeURIComponent(emoji)}/@me`, {}, { headers: { Authorization: token } }).catch(()=>{});
        }
      }
    }
  } catch (e) {}
}

setInterval(startGrind, INTERVAL_SECONDS * 1000);
setInterval(checkReactions, 5000);
console.log("Railway worker is live.");