// aiResponse.ts
export type ConversationState = {
  lastTopic?: 'greeting' | 'howAreYou' | 'movie' | 'genre' | 'actor' | 'director' | 'recommend' | any;
  lastGenre?: string;
  lastActor?: string;
  lastDirector?: string;
  messageCount?: number;
  tone?: 'casual' | 'friendly' | 'professional' | 'neutral';
};

export const getMovieAiReply = ( input: string, userName: string, state?: ConversationState): { reply: string; newState: ConversationState } => {
  const userInput = input.toLowerCase().trim();
  const UserName = userName?.charAt(0).toUpperCase() + userName.slice(1) || 'Guest';

  const newState: ConversationState = { ...state };
  newState.messageCount = (state?.messageCount || 0) + 1;
  const isFollowUp = newState.messageCount > 1;

  // --- Fuzzy match helper ---
  const fuzzyIncludes = (text: string, words: string[]): string | null => {
    for (const word of words) {
      const regex = new RegExp(word.split('').join('.?'), 'i');
      if (regex.test(text)) return word;
    }
    return null;
  };

  // --- Tone detection ---
  const casualWords = ['yo', 'bro', 'sup', 'wassup', 'yooo', 'dude', 'fam'];
  const professionalWords = ['hello', 'hi', 'good morning', 'good afternoon', 'greetings'];
  const friendlyWords = ['hey', 'hiya', 'heyy', 'hello there'];

  const detectTone = (input: string): 'casual' | 'friendly' | 'professional' | 'neutral' => {
    if (fuzzyIncludes(input, casualWords)) return 'casual';
    if (fuzzyIncludes(input, professionalWords)) return 'professional';
    if (fuzzyIncludes(input, friendlyWords)) return 'friendly';
    return 'neutral';
  };

  const tone = detectTone(userInput);
  newState.tone = tone;

  // --- Greeting detection ---
  const greetingWords = ['hi', 'hello', 'hey', 'yo', 'sup', 'whats up', 'hej', 'hiya', 'ahoy', 'bro'];
  const greetingMatch = fuzzyIncludes(userInput, greetingWords);

  const greetingReplies: Record<typeof tone, string[]> = {
    casual: [
      `Yo ${UserName !== 'Guest' ? UserName : 'champ'}! 🍿 You into horror, action, or comedy movies like I am?`,
      `Wassup legend 😎 Are you more of a mystery, drama, or thriller fan like me?`,
      `Eyoo ${UserName}! 🎬 Do you enjoy romance, sci-fi, or adventure films?`,
    ],
    friendly: [
      `Hey ${UserName !== 'Guest' ? UserName : 'there'} 👋 Do you prefer action, comedy, or horror movies?`,
      `Hiya ${UserName}! Are you into drama, thriller, or fantasy like I am?`,
      `Hello hello 🎥 Do you like mystery, romance, or sci-fi films?`,
    ],
    professional: [
      `Hello ${UserName !== 'Guest' ? UserName : ''}, do you enjoy drama, thriller, or action films?`,
      `Good day! 🎬 Are you a fan of comedy, mystery, or romance movies?`,
      `Greetings, ${UserName}. Which do you prefer: sci-fi, horror, or adventure films?`,
    ],
    neutral: [
      `Hey there! 🍿 Are you more into comedy, drama, or thriller movies?`,
      `Hi! Do you enjoy action, romance, or mystery films?`,
      `Hello! Which genre do you usually go for—sci-fi, horror, or adventure?`,
    ],
  };  

  if (greetingMatch && newState.lastTopic !== 'greeting') {
    newState.lastTopic = 'greeting';
    return {
      reply: greetingReplies[tone][Math.floor(Math.random() * greetingReplies[tone].length)],
      newState,
    };
  }

  // --- Regex clusters ---
  const howAreYouRegex = /(how\s*(are|r)?\s*(you|u)|what'?s up|how'?s it going|how is everything)/i;
  const movieRegex = /\b(movie|film|cinema|watch|flick|picture)\b/i;
  const genreRegex = /\b(action|comedy|romance|horror|thriller|sci-fi|sci fi|science fiction|fantasy|drama|animation|cartoon|documentary)\b/i;
  const actorRegex = /\b(tom cruise|leonardo dicaprio|brad pitt|scarlett johansson|denzel washington|meryl streep|robert downey jr|chris hemsworth|angelina jolie|johnny depp|natalie portman|tom hanks|jennifer lawrence|will smith|emma stone|ryan gosling|cate blanchett|morgan freeman|samuel l. jackson|keira knightley)\b/i;
  const directorRegex = /\b(nolan|spielberg|tarantino|scorsese|kubrick|cameron|peter jackson)\b/i;
  const sequelRegex = /\b(sequel|prequel|part\s*\d+|trilogy|series|saga)\b/i;
  const recommendRegex = /\b(recommend|suggest|good\s*movie|what\s*to\s*watch)\b/i;

  // --- Replies ---
  const howAreYouReplies = [
    'All circuits are buzzing ⚡ Just watched a great movie in my database!',
    'Feeling like a critic today 🍿 Ready to discuss films?',
    'I’m great! Hope you’ve seen something exciting lately 🎬',
  ];

  const movieReplies = [
    'Oh I love movies! 🎥 Do you prefer classics or modern films?',
    'Cinema is the best escape! 🍿 Got a favorite actor?',
    'Movies keep me running — well, besides electricity ⚡',
  ];

  const genreReplies: Record<string, string[]> = {
    action: [
      'Action movies are 🔥 Do you prefer old-school like Die Hard or modern ones like John Wick or Mad Max: Fury Road?',
      'Explosions and stunts 💥 I love a good action flick like Mission Impossible, Gladiator, or The Dark Knight!',
    ],
    comedy: [
      'Comedies are the best 😂 Which one always makes you laugh? Maybe Superbad, Step Brothers, or The Hangover?',
      'Laughter is the best special effect, right? 🎭 Classics like Groundhog Day, Bridesmaids, or Anchorman are epic!',
    ],
    romance: [
      'Romance 💖 Always heartwarming. Do you like classics like The Notebook, Pride & Prejudice, or La La Land?',
      'Love stories never get old. Got a favorite rom-com like 10 Things I Hate About You, Notting Hill, or Crazy Rich Asians?',
    ],
    horror: [
      'Horror 👻 Spooky stuff! Do you like slashers like Halloween, psychological thrillers like Get Out, or classics like The Shining?',
      'Perfect for a dark night... Do you prefer A Nightmare on Elm Street, It, or Hereditary?',
    ],
    thriller: [
      'Thrillers keep me on edge 😱 Any favorites like Se7en, Gone Girl, or The Silence of the Lambs?',
      'Twists and suspense... Love it! 🎬 What about Prisoners, Zodiac, or Shutter Island?',
    ],
    'sci fi': [
      'Sci-Fi 🚀 Beyond the stars! Do you prefer Star Wars, Star Trek, or Blade Runner?',
      'Science fiction always expands imagination 🌌 Favorites like Interstellar, The Matrix, or Inception are epic!',
    ],
    fantasy: [
      'Fantasy 🐉 Magical worlds! Are you more into LOTR, Harry Potter, or The Witcher?',
      'Epic quests and dragons... Count me in 🏰 The Hobbit, Chronicles of Narnia, or Pan’s Labyrinth are amazing!',
    ],
    drama: [
      'Drama 🎭 Emotional and powerful. Got a favorite director or movie like The Godfather, Forrest Gump, or A Beautiful Mind?',
      'Sometimes the real world makes the best stories 🌍 Classics like Schindler’s List, Fight Club, or Whiplash are unforgettable!',
    ],
    animation: [
      'Animation is magical ✨ Do you like Pixar (Toy Story, Up, Inside Out) or Studio Ghibli (Spirited Away, My Neighbor Totoro, Princess Mononoke)?',
      'Cartoons for life! Any favorite anime or animated film like Your Name, Howl’s Moving Castle, or Kubo and the Two Strings?',
    ],
    documentary: [
      'Documentaries are so insightful 📚 Favorites like The Last Dance, Free Solo, or Won’t You Be My Neighbor?',
      'Learning through film — the best combo! 🎥 13th, March of the Penguins, or My Octopus Teacher are great picks!',
    ],
  };
  

  // --- Conversation logic ---
  if (howAreYouRegex.test(userInput)) {
    newState.lastTopic = 'howAreYou';
    return { reply: howAreYouReplies[Math.floor(Math.random() * howAreYouReplies.length)], newState };
  }

  if (movieRegex.test(userInput)) {
    newState.lastTopic = 'movie';
    return { reply: movieReplies[Math.floor(Math.random() * movieReplies.length)], newState };
  }

  const genreMatch = userInput.match(genreRegex);
  if (genreMatch) {
    const genre = genreMatch[0];
    newState.lastTopic = 'genre';
    newState.lastGenre = genre;
    const replies = genreReplies[genre] || [`That’s a cool genre! 🎬 What's your favorite from it?`];
    if (isFollowUp) {
      return { reply: `Nice! Since you like ${genre}, you might also enjoy *The Matrix* or *Inception* 🍿`, newState };
    }
    return { reply: replies[Math.floor(Math.random() * replies.length)], newState };
  }

  const actorMatch = userInput.match(actorRegex);
  if (actorMatch) {
    newState.lastTopic = 'actor';
    newState.lastActor = actorMatch[0];
    return { reply: `Ah ${actorMatch[0]} 🎭 — absolute legend! Do you have a favorite performance of theirs?`, newState };
  }

  const directorMatch = userInput.match(directorRegex);
  if (directorMatch) {
    newState.lastTopic = 'director';
    newState.lastDirector = directorMatch[0];
    return { reply: `Ohh ${directorMatch[0]} 🎬! A true visionary. Which of their films do you like most?`, newState };
  }

  if (sequelRegex.test(userInput)) {
    newState.lastTopic = 'sequel';
    return { reply: 'Sequels can be hit or miss 🤔 Do you usually prefer the originals or later parts?', newState };
  }

  if (recommendRegex.test(userInput)) {
    newState.lastTopic = 'recommend';
    if (newState.lastGenre) {
      return {
        reply: `Since you like ${newState.lastGenre}, check out *Inception*, *The Matrix*, or *Interstellar* 🍿`,
        newState,
      };
    }
    return { reply: 'If you’re looking for a rec 🍿 — *Inception*, *Parasite*, and *The Dark Knight* are must-watch!', newState };
  }

  // --- Default reply ---
  return {
    reply: "Hmm, tell me more! What's your favorite movie or genre? 🎬",
    newState,
  };
};
