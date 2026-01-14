// ADHD Marriage Guide Data
// Tulum Sanctuary Design System: Organic Minimalism with Japandi influences

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

export interface KeyTakeaway {
  id: number;
  title: string;
  content: string;
  category: string;
  image: string;
}

export interface BookSection {
  id: number;
  title: string;
  content: string;
}

export interface BookSummary {
  overview: {
    title: string;
    content: string;
  };
  sections: BookSection[];
}

export interface ResearchResource {
  id: number;
  title: string;
  authors: string;
  year: string;
  summary: string;
  full_summary: string;
  link: string;
  resource_type: string;
  article_type: string;
  focus: string[];
}

// Key Takeaways with card images
export const keyTakeaways: KeyTakeaway[] = [
  { id: 1, title: "The ADHD Effect", content: "ADHD symptoms and responses to them create predictable patterns that can damage relationships. Both partners contribute to these patterns.", category: "Understanding", image: "/images/cards/card_01.webp" },
  { id: 2, title: "Two Time Zones", content: "For people with ADHD, there are only two time zones: 'now' and 'not now.' This 'time tunnel vision' makes planning and time management challenging.", category: "Understanding", image: "/images/cards/card_02.webp" },
  { id: 3, title: "Hyperfocus Courtship", content: "During dating, the ADHD partner often hyperfocuses on their new love. This intense attention typically ends once the relationship becomes routine.", category: "Understanding", image: "/images/cards/card_03.webp" },
  { id: 4, title: "Parent-Child Dynamic", content: "The most destructive pattern: one spouse is always responsible while the other rarely is. This kills romantic and sexual connection.", category: "Patterns", image: "/images/cards/card_04.webp" },
  { id: 5, title: "Try Differently, Not Harder", content: "Create ADHD-sensitive routines instead of just increasing effort. Work WITH the ADHD brain, not against it.", category: "Strategy", image: "/images/cards/card_05.webp" },
  { id: 6, title: "The Three-Legged Stool", content: "Optimal treatment includes: physical changes (medication), behavioral changes (habits), and interaction strategies with your spouse.", category: "Treatment", image: "/images/cards/card_06.webp" },
  { id: 7, title: "Trust Redefined", content: "Trust can't be based on perfect follow-through. Base it on evidence that your partner is managing ADHD to the best of their ability.", category: "Relationships", image: "/images/cards/card_07.webp" },
  { id: 8, title: "Emotional Hyper-Arousal", content: "Many with ADHD have trouble regulating emotions, especially negative ones. They're easily triggered into irritability over minor things.", category: "Understanding", image: "/images/cards/card_08.webp" },
  { id: 9, title: "Personal Boundaries", content: "A boundary is a value or behavior essential to living as the person you wish to be. Focus on people issues, not 'thing' issues.", category: "Strategy", image: "/images/cards/card_09.webp" },
  { id: 10, title: "The Gift of Attention", content: "Validate your spouse by giving them focused attention. Make them feel seen and valued through your presence.", category: "Connection", image: "/images/cards/card_10.webp" },
  { id: 11, title: "Cultivate Empathy First", content: "Step 1 of healing: Understand what it's like to be in your partner's shoes, whether they have ADHD or not.", category: "Steps", image: "/images/cards/card_11.webp" },
  { id: 12, title: "Feeling Unloved", content: "Virtually all people with ADHD having marital issues feel 'different,' unloved, and unwanted. They long to be accepted as they are.", category: "Understanding", image: "/images/cards/card_12.webp" },
  { id: 13, title: "Hidden Shame", content: "Many people with ADHD hide a large amount of shame, sometimes compensating with bluster or retreat.", category: "Understanding", image: "/images/cards/card_13.webp" },
  { id: 14, title: "Learning Conversations", content: "Focus on understanding each other's perspectives without judgment. Your partner's opinion is just as legitimate as your own.", category: "Communication", image: "/images/cards/card_14.webp" },
  { id: 15, title: "Validation Isn't Agreement", content: "Validation is acknowledging your partner's logic is internally consistent, even if you disagree with their conclusion.", category: "Communication", image: "/images/cards/card_15.webp" },
  { id: 16, title: "Five Core Concerns", content: "Appreciation, Affiliation, Autonomy, Status, and Role. Meeting these basic human needs prevents conflict.", category: "Communication", image: "/images/cards/card_16.webp" },
  { id: 17, title: "Verbal Cues", content: "Develop agreed-upon words or phrases to redirect conversations that are escalating or to address sensitive topics.", category: "Strategy", image: "/images/cards/card_17.webp" },
  { id: 18, title: "Both Need Treatment", content: "The non-ADHD spouse may develop depression, anxiety, or anger issues. Both partners need support and healing.", category: "Treatment", image: "/images/cards/card_18.webp" },
  { id: 19, title: "Stop Diagnosing", content: "Non-ADHD spouses should stop diagnosing their partner's ADHD. Focus on specific relationship issues and your own behavior.", category: "Strategy", image: "/images/cards/card_19.webp" },
  { id: 20, title: "The Little Voices", content: "ADHD partner fears failure. Non-ADHD partner fears everything will fall apart. Both voices need to be addressed.", category: "Understanding", image: "/images/cards/card_20.webp" },
  { id: 21, title: "Safe Communication", content: "Create an environment where it's safe to communicate even around difficult ideas. This is the best defense against destructive patterns.", category: "Communication", image: "/images/cards/card_21.webp" },
  { id: 22, title: "Tone Matters Most", content: "Your tone of voice is the hardest part of communication. Frustration and anger trigger defensive responses.", category: "Communication", image: "/images/cards/card_22.webp" },
  { id: 23, title: "Schedule Hard Talks", content: "Organize conversations so you have specific times for difficult topics. This lightens the atmosphere for the rest of the week.", category: "Strategy", image: "/images/cards/card_23.webp" },
  { id: 24, title: "Connection First", content: "Put strengthening your connections first, getting things done second. Strong threads of connection make everything easier.", category: "Connection", image: "/images/cards/card_24.webp" },
  { id: 25, title: "Respect Space", content: "Respect either partner's need for space without giving up underlying connections. Some retreat provides strength.", category: "Relationships", image: "/images/cards/card_25.webp" },
  { id: 26, title: "New Adventures Together", content: "Doing new and exciting activities together improves feelings more than just spending time together.", category: "Connection", image: "/images/cards/card_26.webp" },
  { id: 27, title: "Celebrate Successes", content: "Celebrating successes is more powerful than showing support during difficulties. Focus on positives.", category: "Connection", image: "/images/cards/card_27.webp" },
  { id: 28, title: "Build on Spontaneity", content: "Spontaneity is a natural ADHD trait. Revel in it to add fun and excitement to your relationship.", category: "Connection", image: "/images/cards/card_28.webp" },
  { id: 29, title: "Eradicate Blame", content: "Eradicate the blame game completely. Blame is destructive and doesn't lead to positive change.", category: "Strategy", image: "/images/cards/card_29.webp" },
  { id: 30, title: "Step Out of Anger", content: "Step out of the cycle of anger rather than continuing destructive patterns of expressing or suppressing it.", category: "Strategy", image: "/images/cards/card_30.webp" },
  { id: 31, title: "ADHD Is Biological", content: "ADHD has a biological basis involving dysregulation of the reward system, primarily dopamine. It's not laziness.", category: "Understanding", image: "/images/cards/card_31.webp" },
  { id: 32, title: "Medication Jump-Starts", content: "Medication makes changing habits easier by addressing brain differences, but it's not sufficient alone.", category: "Treatment", image: "/images/cards/card_32.webp" },
  { id: 33, title: "ACBD Rule", content: "Always Consult Before Deciding. This simple rule avoids conflict around issues of autonomy.", category: "Strategy", image: "/images/cards/card_33.webp" },
  { id: 34, title: "Autonomy Without War", content: "Declare autonomy without declaring war. Be autonomous but stay connected around positive things.", category: "Relationships", image: "/images/cards/card_34.webp" },
  { id: 35, title: "Change Takes Time", content: "Remember that change takes time. Progress is gradual and requires patience and persistence.", category: "Progress", image: "/images/cards/card_35.webp" },
  { id: 36, title: "Applaud Progress", content: "Applaud your progress and celebrate small wins. Recognizing progress reinforces positive changes.", category: "Progress", image: "/images/cards/card_36.webp" },
  { id: 37, title: "Seek ADHD-Informed Help", content: "Seek help from people who understand ADHD. General therapists may not understand the specific dynamics.", category: "Treatment", image: "/images/cards/card_37.webp" },
  { id: 38, title: "The True Self", content: "ADHD symptoms are NOT the person's true qualities. They're actually the opposite of who they really are when managed.", category: "Understanding", image: "/images/cards/card_38.webp" },
  { id: 39, title: "Efficiency vs. Connection", content: "Efficiency is relatively unimportant compared to connection and respect, except when children rely on you.", category: "Relationships", image: "/images/cards/card_39.webp" },
  { id: 40, title: "The Ultimate Goal", content: "Take control of ADHD together so you can thrive and become, once again, the partners you hoped to be.", category: "Progress", image: "/images/cards/card_40.webp" }
];

// Book Summaries - Expanded with proper formatting
export const bookSummary: BookSummary = {
  overview: {
    title: "Understanding the ADHD Effect on Marriage",
    content: "ADHD affects approximately 4-5% of adults and creates predictable patterns in relationships that can be deeply damaging if not understood and addressed. The 'ADHD effect' describes how ADHD symptoms and the responses to them create cycles that both partners contribute to. Research shows that 58% of relationships with at least one ADHD partner are clinically dysfunctional—twice the rate of non-ADHD relationships. People with ADHD are almost twice as likely to divorce. However, with proper understanding, treatment, and strategies, couples can break these patterns and rebuild thriving relationships."
  },
  sections: [
    { id: 1, title: "The ADHD Brain: What Partners Need to Know", content: "ADHD has a biological basis involving dysregulation of the reward system, primarily dopamine. Dr. Ned Hallowell describes living with ADHD as 'driving in the rain with bad windshield wipers at 90 mph'—things are occasionally clear but most of the time everything is coming fast.\n\nKey characteristics of the ADHD brain include:\n\n1. Time blindness: Only two time zones exist—'now' and 'not now'—making planning extremely challenging\n2. Race-car brain without brakes: Impulsivity and difficulty stopping once started on a task or thought\n3. Emotional hyper-arousal: Easily triggered into irritability or anger over minor things\n4. Inconsistent attention: Can hyperfocus on interesting tasks but struggle with routine ones\n5. Working memory challenges: Difficulty holding information while using it\n6. Executive function deficits: Problems with planning, organizing, and prioritizing\n\nUnderstanding these neurological differences is the first step toward empathy and effective strategies. ADHD is not a character flaw or laziness—it's a brain-based condition that responds to treatment." },
    { id: 2, title: "The Hyperfocus Courtship Trap", content: "During courtship, the ADHD partner often 'hyperfocuses' on their new love interest, showering them with attention, affection, and romantic gestures. This intense focus makes the non-ADHD partner feel like the center of the universe.\n\nThe hyperfocus courtship pattern typically unfolds as follows:\n\n1. Initial attraction triggers intense ADHD hyperfocus on the new partner\n2. The non-ADHD partner receives unprecedented attention and feels deeply loved\n3. The relationship provides constant novelty and stimulation that sustains focus\n4. As the relationship becomes routine, the novelty wears off\n5. Hyperfocus shifts to other stimulating activities or interests\n6. The non-ADHD partner feels abandoned and confused\n\nThis shift can feel like abandonment and often marks the beginning of relationship difficulties. The non-ADHD partner is left wondering what happened to the attentive, romantic person they fell in love with. Understanding that this pattern is related to ADHD's need for stimulation—not a lack of love—is crucial for both partners." },
    { id: 3, title: "The Parent-Child Dynamic", content: "The most common and destructive pattern in ADHD marriages is the parent-child dynamic. One spouse (usually the non-ADHD partner) becomes almost always responsible, while the other is rarely so.\n\nHow this dynamic develops:\n\n1. The non-ADHD partner notices tasks aren't getting done\n2. They start taking over responsibilities 'temporarily'\n3. The ADHD partner feels criticized and withdraws further\n4. The non-ADHD partner takes on even more, becoming resentful\n5. The ADHD partner feels controlled and infantilized\n6. Both partners become locked in their roles\n\nWhy this dynamic is devastating:\n\n1. It's almost impossible to be sexually attracted to a parent figure\n2. The non-ADHD spouse feels like a 'single parent' or 'household slave'\n3. The ADHD spouse feels like they can never do anything right\n4. Resentment builds on both sides\n5. Intimacy and connection erode completely\n\nBreaking this pattern requires both partners to change: the ADHD spouse must take more responsibility while the non-ADHD spouse must become less controlling." },
    { id: 4, title: "The Non-ADHD Spouse Experience", content: "Non-ADHD spouses often experience profound loneliness, exhaustion, and self-loathing. They describe feeling like everything is 'spinning out of control'—no matter how hard they try to regain control, they feel weaker.\n\nCommon experiences of non-ADHD spouses:\n\n1. Chronic exhaustion from carrying the bulk of responsibilities\n2. Loneliness despite being in a relationship\n3. Feeling like a 'single parent' even when married\n4. Fantasizing about leaving for stability and peace\n5. Hating who they've become: angry, nagging, controlling\n6. Feeling like the 'kill-joy' always focused on practical matters\n7. Loss of trust due to repeated broken promises\n8. Grief for the relationship they thought they'd have\n\nThe 'exhaustion factor' comes from carrying household and family responsibilities while often working full-time. Many develop depression, anxiety, or anger issues as a result. Understanding and validating these experiences is essential for healing—the non-ADHD spouse's pain is real and legitimate." },
    { id: 5, title: "The ADHD Spouse Experience", content: "Virtually all people with ADHD who have marital issues feel 'different,' unloved, and unwanted. They long to be accepted as they are, in spite of their imperfections.\n\nCommon experiences of ADHD spouses:\n\n1. Feeling fundamentally 'different' and misunderstood\n2. Carrying hidden shame from years of criticism\n3. Developing unhealthy coping mechanisms (lying, deflecting blame)\n4. Feeling like they can never do anything right\n5. Retreating into a defensive shell when triggered\n6. Experiencing the 'logical' choice as not trying to avoid failure\n7. Longing deeply to be loved and accepted as they are\n8. Feeling controlled and infantilized by their partner\n\nMany have developed a 'kit of behaviors' including unhealthy coping mechanisms like lying, covering for mistakes, or deflecting blame—these are survival strategies from years of criticism, not character flaws. One of their strongest emotional desires is to be loved and accepted as they are." },
    { id: 6, title: "The Six Steps to a Better Relationship", content: "The book outlines six essential steps for healing ADHD-affected relationships. Each step builds on the previous ones and requires commitment from both partners.\n\nThe Six Steps:\n\n1. Cultivate Empathy\n   - Understand what it's like to be in your partner's shoes\n   - Recognize that both partners are struggling\n   - Let go of assumptions about your partner's motivations\n\n2. Address Obstacle Emotions\n   - Work through anger, fear, shame, and denial\n   - Recognize how these emotions block progress\n   - Seek individual support if needed\n\n3. Get Treatment for Both Partners\n   - ADHD treatment for the ADHD partner\n   - Support for the non-ADHD partner's depression, anxiety, or anger\n   - Consider couples therapy with an ADHD-informed therapist\n\n4. Improve Communication\n   - Practice learning conversations\n   - Use validation techniques\n   - Develop verbal cues for difficult moments\n\n5. Set Boundaries\n   - Establish values and behaviors essential to who you want to be\n   - Focus on people issues, not 'thing' issues\n   - Respect each other's autonomy\n\n6. Reignite Romance\n   - Rebuild connection through new adventures\n   - Celebrate successes together\n   - Give the gift of focused attention" },
    { id: 7, title: "Step 1: Cultivating Empathy", content: "The first and most foundational step is cultivating empathy—truly understanding what it's like to be in your partner's shoes.\n\nFor non-ADHD partners, cultivating empathy means:\n\n1. Understanding that ADHD is neurological, not a choice\n2. Recognizing that your partner isn't being lazy or uncaring\n3. Appreciating the shame and frustration your partner carries\n4. Seeing past symptoms to the person underneath\n5. Acknowledging that your partner is trying, even when it doesn't look like it\n\nFor ADHD partners, cultivating empathy means:\n\n1. Understanding the exhaustion your partner experiences\n2. Recognizing the legitimate pain caused by ADHD symptoms\n3. Appreciating that your partner's frustration comes from caring\n4. Seeing how your symptoms affect daily life for both of you\n5. Acknowledging the burden your partner has been carrying\n\nEmpathy doesn't mean excusing harmful behavior—it means understanding the context in which it occurs. This understanding creates space for change." },
    { id: 8, title: "Step 2: Addressing Obstacle Emotions", content: "Before real progress can happen, both partners must work through the obstacle emotions that block healing: anger, fear, shame, hopelessness, and denial.\n\nCommon obstacle emotions and how to address them:\n\n1. Anger\n   - Recognize that chronic anger is destructive\n   - Understand the underlying hurt beneath the anger\n   - Learn to express needs without attacking\n   - Step out of the anger cycle rather than suppressing or exploding\n\n2. Fear\n   - The ADHD partner fears failure and rejection\n   - The non-ADHD partner fears things falling apart\n   - Both must acknowledge these fears openly\n   - Build safety through consistent, small actions\n\n3. Shame\n   - ADHD partners often carry deep shame\n   - Shame leads to hiding, lying, and defensiveness\n   - Create an environment where mistakes can be discussed\n   - Separate the person from the symptoms\n\n4. Hopelessness\n   - Years of struggle can create despair\n   - Focus on small wins and progress\n   - Remember that change is possible with the right approach\n\n5. Denial\n   - Some refuse to accept ADHD's impact\n   - Education about ADHD helps break through denial\n   - Focus on specific behaviors rather than labels" },
    { id: 9, title: "Step 3: Getting Treatment for Both Partners", content: "Effective treatment requires addressing the needs of both partners, not just the one with ADHD.\n\nThe Three-Legged Stool of ADHD Treatment:\n\n1. Physical Changes (Medication)\n   - Medication is a 'jump-start' that makes other changes easier\n   - It addresses brain chemistry differences\n   - Not a 'magic pill'—must be combined with other approaches\n   - Finding the right medication may take time\n\n2. Behavioral Changes (Habits and Routines)\n   - Create ADHD-sensitive systems that work with the brain\n   - Use external reminders, timers, and organizational tools\n   - Build habits through repetition and positive reinforcement\n   - 'Try differently, not harder'\n\n3. Interaction Strategies\n   - Learn communication techniques specific to ADHD relationships\n   - Develop coping strategies for challenging moments\n   - Build on strengths rather than focusing only on weaknesses\n\nTreatment for the Non-ADHD Partner:\n\n1. Address depression, anxiety, or anger that may have developed\n2. Process grief for the relationship you expected\n3. Learn to let go of control\n4. Rebuild your own identity and interests\n5. Develop healthy coping strategies" },
    { id: 10, title: "Step 4: Improving Communication", content: "Effective communication in ADHD relationships requires specific strategies that account for the unique challenges both partners face.\n\nKey Communication Strategies:\n\n1. Learning Conversations\n   - Focus on understanding, not winning\n   - Ask questions to understand your partner's perspective\n   - Acknowledge that your partner's view is as valid as yours\n   - Avoid assumptions about motivations\n\n2. Validation Techniques\n   - Validation isn't agreement—it's acknowledgment\n   - Show you understand your partner's logic\n   - Reflect back what you hear before responding\n   - Validate emotions even when you disagree with conclusions\n\n3. Verbal Cues\n   - Develop agreed-upon words to redirect escalating conversations\n   - Use cues to signal when you need a break\n   - Create safe words for sensitive topics\n\n4. The Five Core Concerns\n   - Appreciation: Feel valued and recognized\n   - Affiliation: Feel connected and part of a team\n   - Autonomy: Feel respected as an independent person\n   - Status: Feel your position is acknowledged\n   - Role: Feel your contributions matter\n\n5. Tone Awareness\n   - Tone of voice is often more important than words\n   - Frustration and anger trigger defensive responses\n   - Practice speaking calmly even when upset" },
    { id: 11, title: "Step 5: Setting Effective Boundaries", content: "Boundaries are essential for maintaining individual identity while building a healthy relationship. They're about who you want to be, not about controlling your partner.\n\nPrinciples of Effective Boundaries:\n\n1. Focus on People Issues, Not Things\n   - Good boundaries: respect, honesty, autonomy\n   - Poor boundaries: who does dishes, how to fold laundry\n   - Thing issues can be negotiated; people issues define who you are\n\n2. Don't Create Boundaries in Anger\n   - Boundaries shouldn't be punishments\n   - They should reflect your values, not reactions\n   - Take time to identify what truly matters to you\n\n3. The ACBD Rule: Always Consult Before Deciding\n   - Prevents autonomy conflicts\n   - Shows respect for your partner's input\n   - Doesn't mean you can't make decisions—just communicate first\n\n4. Autonomy Without War\n   - You can be autonomous and still connected\n   - Declare independence around specific issues\n   - Stay connected around positive things\n   - Autonomy isn't abandonment\n\n5. Boundaries Protect Both Partners\n   - They prevent resentment from building\n   - They clarify expectations\n   - They allow both partners to be authentic" },
    { id: 12, title: "Step 6: Reigniting Romance and Connection", content: "The final step focuses on rebuilding the emotional and romantic connection that brought you together.\n\nResearch-Backed Strategies for Rebuilding Connection:\n\n1. New Adventures Together\n   - Doing new, exciting activities improves feelings more than routine time\n   - Novelty activates the same brain systems as early romance\n   - Plan regular adventures, even small ones\n\n2. Celebrate Successes\n   - Celebrating wins is more powerful than supporting during difficulties\n   - Acknowledge progress, no matter how small\n   - Create rituals around celebration\n\n3. The Gift of Attention\n   - Focused attention is one of the most powerful tools for intimacy\n   - Put away devices and be fully present\n   - Make your partner feel seen and valued\n\n4. Build on ADHD Strengths\n   - Spontaneity can add excitement\n   - Creativity brings fresh perspectives\n   - Enthusiasm is contagious\n\n5. Prioritize Connection Over Efficiency\n   - Strong connections make everything easier\n   - Efficiency matters less than feeling loved\n   - Schedule regular time for just the two of you\n\n6. Physical Affection\n   - Rebuild physical connection gradually\n   - Non-sexual touch rebuilds safety\n   - Let intimacy grow naturally from connection" },
    { id: 13, title: "The Three-Legged Stool of Treatment", content: "Optimal ADHD treatment includes three 'legs' that work together. Removing any one makes the stool unstable.\n\nLeg 1: Physical Changes (Medication)\n\n1. Medication addresses the biological basis of ADHD\n2. It's a 'jump-start' that makes other changes possible\n3. Common medications include stimulants and non-stimulants\n4. Finding the right medication and dose takes time\n5. Medication alone is not sufficient—it enables other changes\n\nLeg 2: Behavioral Changes (Habits and Routines)\n\n1. Create ADHD-sensitive systems\n2. Use external supports: timers, reminders, apps\n3. Build routines through repetition\n4. 'Try differently, not harder'\n5. Work with the brain, not against it\n\nLeg 3: Interaction Strategies\n\n1. Learn communication techniques for ADHD relationships\n2. Develop coping strategies for challenging moments\n3. Build on strengths\n4. Create safety for both partners\n5. Practice new patterns consistently\n\nWhy All Three Are Necessary:\n\n1. Medication without behavioral change leads to frustration\n2. Behavioral change without medication is much harder\n3. Both without interaction strategies leaves the relationship struggling\n4. All three together create sustainable improvement" },
    { id: 14, title: "Communication Strategies That Work", content: "Effective communication in ADHD relationships requires specific strategies that account for the unique challenges both partners face.\n\nConflict Intimacy:\n\n1. Both partners speak non-aggressively\n2. Both partners listen non-defensively\n3. The goal is understanding, not winning\n4. Disagreement is allowed; disrespect is not\n\nValidation Techniques:\n\n1. Validation is not agreement\n2. It's acknowledging your partner's logic is internally consistent\n3. 'I can see why you feel that way' doesn't mean 'You're right'\n4. Validate before problem-solving\n\nVerbal Cues:\n\n1. Agreed-upon words to redirect escalating conversations\n2. Examples: 'I need a break,' 'Let's pause,' 'Time out'\n3. Both partners must respect the cue\n4. Return to the conversation when calm\n\nScheduled Conversations:\n\n1. Set specific times for difficult topics\n2. This lightens the atmosphere the rest of the week\n3. Both partners can prepare mentally\n4. Prevents ambush conversations\n\nTone Awareness:\n\n1. Tone is often more important than words\n2. Frustration triggers defensiveness\n3. Practice calm delivery even when upset\n4. Take breaks when tone becomes harsh" },
    { id: 15, title: "Setting Effective Boundaries", content: "A personal boundary is a value, characteristic, or behavior essential to living as the person you wish to be.\n\nCharacteristics of Effective Boundaries:\n\n1. Focus on people issues (respect, autonomy, values)\n2. Not created in response to arguments\n3. Not intended to punish\n4. Reflect who you want to be\n5. Respect your partner's autonomy\n\nThe ACBD Rule:\n\n1. Always Consult Before Deciding\n2. Prevents autonomy conflicts\n3. Shows respect for your partner\n4. Doesn't mean you can't decide—just communicate first\n\nAutonomy Without War:\n\n1. You can be autonomous and connected\n2. Declare independence around specific issues\n3. Stay connected around positive things\n4. Autonomy isn't abandonment\n\nBoundaries vs. Ultimatums:\n\n1. Boundaries define your behavior, not your partner's\n2. 'I will not accept being yelled at' vs. 'You can't yell at me'\n3. You control your response, not their behavior\n4. Consequences are natural, not punishments" },
    { id: 16, title: "Rebuilding Connection and Romance", content: "Research shows that specific strategies are more effective than others for rebuilding connection.\n\nWhat Research Shows:\n\n1. New activities together improve feelings more than routine time\n2. Celebrating successes is more powerful than supporting during difficulties\n3. Physical touch releases bonding hormones\n4. Shared positive experiences create lasting memories\n\nPractical Strategies:\n\n1. Schedule regular date nights\n2. Try new activities together\n3. Celebrate small wins\n4. Give the gift of focused attention\n5. Post photos of adventures together\n6. Build on ADHD's natural spontaneity\n\nThe Gift of Attention:\n\n1. Put away devices\n2. Make eye contact\n3. Listen without planning your response\n4. Ask follow-up questions\n5. Show genuine interest\n\nPrioritizing Connection:\n\n1. Connection first, tasks second\n2. Strong connections make everything easier\n3. Efficiency is less important than feeling loved\n4. Schedule time for just the two of you" },
    { id: 17, title: "The Little Voices and Past Pain", content: "Both partners carry internal voices that drive destructive behaviors. Understanding and addressing these voices is essential for healing.\n\nThe ADHD Partner's Little Voice:\n\n1. 'You're going to fail'\n2. 'You're not good enough'\n3. 'Why bother trying?'\n4. 'They'll just criticize you anyway'\n5. This voice comes from years of criticism and failure\n\nThe Non-ADHD Partner's Little Voice:\n\n1. 'If you don't handle this, everything will fall apart'\n2. 'You can't trust them to follow through'\n3. 'You have to do everything yourself'\n4. 'They don't care enough to try'\n5. This voice comes from years of disappointment\n\nAddressing Past Pain:\n\n1. Acknowledge the legitimacy of past pain\n2. Recognize that today's pain doesn't mean returning to the past\n3. You are in control of your responses now\n4. Healing requires addressing internal voices\n5. Create safety for both partners to be vulnerable\n\nBreaking the Cycle:\n\n1. Treat ADHD effectively\n2. Create safe communication environments\n3. Build new positive experiences\n4. Practice new responses to old triggers\n5. Be patient with setbacks" },
    { id: 18, title: "17 Critical Points for Success", content: "These 17 points summarize the essential principles for success in ADHD-affected relationships.\n\n1. Eradicate the blame game\n   - Blame is destructive and doesn't lead to change\n\n2. Step out of the cycle of anger\n   - Neither expressing nor suppressing anger works\n\n3. Reestablish connection\n   - Focus on the relationship, not just logistics\n\n4. Be aware of shame and fear\n   - Both partners carry these emotions\n\n5. Validate your spouse with the gift of attention\n   - Make them feel seen and valued\n\n6. Seek help from people who understand ADHD\n   - General therapists may miss key dynamics\n\n7. Remember that change takes time\n   - Progress is gradual\n\n8. Applaud your progress\n   - Celebrate small wins\n\n9. Both partners need treatment\n   - Not just the ADHD partner\n\n10. The ADHD spouse must take responsibility for their symptoms\n    - Own the impact without shame\n\n11. The non-ADHD spouse must become less controlling\n    - Let go of the parent role\n\n12. Create ADHD-sensitive routines\n    - Work with the brain, not against it\n\n13. Use verbal cues for difficult conversations\n    - Agreed-upon words to redirect\n\n14. Schedule time for connection\n    - Make it a priority\n\n15. Celebrate successes together\n    - More powerful than supporting during difficulties\n\n16. Respect each other's need for space\n    - Some retreat provides strength\n\n17. Take control of ADHD together so you can thrive\n    - You're a team facing a challenge together" },
    { id: 19, title: "Understanding Emotional Dysregulation", content: "Emotional dysregulation is a core but often overlooked feature of ADHD that significantly impacts relationships.\n\nWhat Emotional Dysregulation Looks Like:\n\n1. Intense emotional reactions to minor triggers\n2. Difficulty calming down once upset\n3. Mood swings that seem disproportionate\n4. Irritability and frustration over small things\n5. Difficulty tolerating frustration\n6. Emotional flooding during conflict\n\nWhy It Happens:\n\n1. The same brain differences that cause attention issues affect emotion regulation\n2. The prefrontal cortex, which regulates emotions, functions differently in ADHD\n3. Emotional responses may be faster and more intense\n4. The 'brakes' for emotions are weaker\n\nStrategies for Managing Emotional Dysregulation:\n\n1. Recognize early warning signs of escalation\n2. Take breaks before reaching the point of no return\n3. Use physical activity to discharge emotional energy\n4. Practice mindfulness to increase awareness\n5. Medication can help regulate emotional responses\n6. Develop a plan for high-emotion moments\n\nHow Partners Can Help:\n\n1. Don't take emotional reactions personally\n2. Give space when needed\n3. Avoid escalating with your own emotions\n4. Return to discussions when calm\n5. Acknowledge the difficulty of emotional regulation" },
    { id: 20, title: "Building ADHD-Sensitive Routines", content: "Creating routines that work with the ADHD brain rather than against it is essential for sustainable change.\n\nPrinciples of ADHD-Sensitive Routines:\n\n1. External over internal\n   - Use visible reminders, timers, and alarms\n   - Don't rely on memory alone\n\n2. Interesting over boring\n   - Add elements of novelty or challenge\n   - Gamify routine tasks when possible\n\n3. Immediate over delayed\n   - Create immediate consequences and rewards\n   - Break large tasks into small, completable chunks\n\n4. Simple over complex\n   - Reduce steps and decisions\n   - Remove barriers to starting\n\n5. Consistent over perfect\n   - Good enough routines done consistently beat perfect routines abandoned\n\nPractical Examples:\n\n1. Morning routine: Lay out clothes the night before, use a checklist\n2. Medication: Set daily alarms, use a pill organizer\n3. Household tasks: Assign specific days, use timers\n4. Communication: Schedule regular check-ins\n5. Finances: Automate bills, use apps for tracking\n\nCommon Mistakes to Avoid:\n\n1. Creating overly complex systems\n2. Relying on willpower alone\n3. Expecting perfection\n4. Giving up after setbacks\n5. Not involving the ADHD partner in design" },
    { id: 21, title: "The Role of Medication in Treatment", content: "Medication is often a crucial component of ADHD treatment, but it's important to understand both its benefits and limitations.\n\nHow ADHD Medication Works:\n\n1. Stimulant medications increase dopamine and norepinephrine\n2. This improves focus, impulse control, and emotional regulation\n3. Effects are typically noticeable within hours\n4. Non-stimulant options are also available\n\nBenefits of Medication:\n\n1. Makes behavioral changes much easier to implement\n2. Improves focus and attention\n3. Reduces impulsivity\n4. Can help with emotional regulation\n5. Often improves relationship interactions\n\nLimitations of Medication:\n\n1. Not a 'magic pill' that solves everything\n2. Doesn't teach new skills or habits\n3. Doesn't repair relationship damage\n4. May have side effects\n5. Finding the right medication takes time\n\nWhat Partners Should Know:\n\n1. Medication is a tool, not a cure\n2. It enables other changes but doesn't replace them\n3. Support the process of finding the right medication\n4. Don't expect immediate relationship improvement\n5. Medication plus behavioral strategies plus interaction skills = best outcomes" },
    { id: 22, title: "When to Seek Professional Help", content: "While self-help strategies are valuable, professional support is often necessary for lasting change.\n\nSigns You Need Professional Help:\n\n1. Relationship is in crisis\n2. One or both partners are depressed or anxious\n3. Communication has completely broken down\n4. There's been infidelity or other major breach\n5. Self-help strategies aren't working\n6. ADHD is undiagnosed or untreated\n\nTypes of Professional Help:\n\n1. ADHD-informed couples therapist\n   - Understands ADHD dynamics\n   - Can address both ADHD and relationship issues\n\n2. Individual therapist for each partner\n   - Addresses personal issues\n   - Provides individual support\n\n3. Psychiatrist or prescriber\n   - Manages ADHD medication\n   - Addresses co-occurring conditions\n\n4. ADHD coach\n   - Helps with practical strategies\n   - Provides accountability\n\nFinding the Right Help:\n\n1. Look for ADHD expertise specifically\n2. Ask about experience with ADHD relationships\n3. Interview potential therapists\n4. Be willing to try different providers\n5. Consider online options for ADHD specialists" },
    { id: 23, title: "Rebuilding Trust After ADHD Damage", content: "Trust is often severely damaged in ADHD relationships due to repeated broken promises and unmet expectations. Rebuilding it requires a new approach.\n\nWhy Traditional Trust-Building Doesn't Work:\n\n1. ADHD makes consistent follow-through difficult\n2. Expecting perfection sets everyone up for failure\n3. Past disappointments create hypervigilance\n4. Small lapses feel like major betrayals\n\nA New Framework for Trust:\n\n1. Base trust on effort and management, not perfection\n2. Look for evidence of genuine trying\n3. Acknowledge the difficulty of change\n4. Celebrate progress, not just outcomes\n5. Separate ADHD symptoms from character\n\nPractical Steps for Rebuilding Trust:\n\n1. Start with small, achievable commitments\n2. Be specific about what you're committing to\n3. Use external supports to follow through\n4. Communicate proactively about challenges\n5. Acknowledge when you fall short without excuses\n6. Show consistent effort over time\n\nFor the Non-ADHD Partner:\n\n1. Recognize that perfect follow-through may not be possible\n2. Look for patterns of improvement, not perfection\n3. Acknowledge the effort behind the attempt\n4. Give credit for progress\n5. Be patient with the process" },
    { id: 24, title: "Managing Household Responsibilities", content: "Household management is often a major source of conflict in ADHD relationships. Success requires ADHD-sensitive strategies and realistic expectations.\n\nWhy Household Tasks Are Challenging:\n\n1. They're often boring and routine\n2. They require consistent attention over time\n3. They involve multiple steps and planning\n4. Consequences of not doing them are delayed\n5. They compete with more stimulating activities\n\nStrategies That Work:\n\n1. Play to strengths\n   - Assign tasks based on ability, not gender roles\n   - ADHD partners may excel at crisis management or creative tasks\n\n2. Use external systems\n   - Shared calendars and task lists\n   - Visual reminders\n   - Automated systems where possible\n\n3. Create accountability without nagging\n   - Regular check-ins at scheduled times\n   - Focus on systems, not blame\n   - Celebrate completed tasks\n\n4. Lower standards where possible\n   - Good enough is often good enough\n   - Prioritize what matters most\n   - Let go of perfectionism\n\n5. Consider outside help\n   - Cleaning services\n   - Meal delivery\n   - Organizational professionals\n\nAvoiding the Parent-Child Trap:\n\n1. Don't take over tasks that aren't getting done\n2. Let natural consequences occur when safe\n3. Focus on your own responsibilities\n4. Communicate needs without nagging" }
  ]
};

// Quiz Questions (100 questions) with detailed explanations
export const quizQuestions: QuizQuestion[] = [
  { id: 1, question: "What percentage of adults are estimated to have ADHD?", options: ["1-2%", "4-5%", "10-15%", "20-25%"], correctAnswer: 1, explanation: "Research consistently indicates that approximately 4-5% of adults have ADHD, though many remain undiagnosed. This means in any group of 20-25 adults, at least one likely has ADHD. The condition persists from childhood into adulthood in about 60% of cases, and many adults are only diagnosed later in life when relationship or work problems prompt evaluation.", category: "Understanding ADHD" },
  { id: 2, question: "According to research, what percentage of relationships with at least one ADHD partner are clinically dysfunctional?", options: ["29%", "42%", "58%", "75%"], correctAnswer: 2, explanation: "Studies show that 58% of relationships with at least one ADHD partner are clinically dysfunctional—this is twice the rate found in non-ADHD relationships (29%). This striking statistic underscores how significantly ADHD impacts relationship functioning and why specialized understanding and strategies are essential for couples affected by ADHD.", category: "Statistics" },
  { id: 3, question: "What does Dr. Ned Hallowell compare living with ADHD to?", options: ["Walking through fog", "Driving in rain with bad windshield wipers at 90 mph", "Swimming against the current", "Running a marathon with weights"], correctAnswer: 1, explanation: "Dr. Ned Hallowell, a psychiatrist who has ADHD himself, describes living with ADHD as 'driving in the rain with bad windshield wipers at 90 mph.' This vivid metaphor captures how things are occasionally clear but most of the time everything is coming fast and visibility is poor. It helps non-ADHD partners understand the constant cognitive challenge their partners face.", category: "Understanding ADHD" },
  { id: 4, question: "For people with ADHD, how many 'time zones' typically exist?", options: ["One: now", "Two: now and not now", "Three: past, present, future", "Four: urgent, important, later, never"], correctAnswer: 1, explanation: "People with ADHD often experience only two time zones: 'now' and 'not now.' This 'time tunnel vision' makes planning and time management extremely challenging because anything not happening right now feels equally distant—whether it's in five minutes or five months. This explains why ADHD partners may struggle with deadlines, appointments, and long-term planning.", category: "Understanding ADHD" },
  { id: 5, question: "What is the most common destructive pattern in ADHD marriages?", options: ["Financial conflict", "Parent-child dynamic", "Social isolation", "Career competition"], correctAnswer: 1, explanation: "The parent-child dynamic is the most common and destructive pattern in ADHD marriages. One spouse (usually non-ADHD) becomes always responsible while the other rarely is. This dynamic is devastating because it's almost impossible to be sexually attracted to a parent figure, and it breeds resentment on both sides—the 'parent' feels exhausted and unappreciated while the 'child' feels controlled and criticized.", category: "Relationship Patterns" },
  { id: 6, question: "What happens during the 'hyperfocus courtship' phase?", options: ["The ADHD partner avoids commitment", "The ADHD partner intensely focuses on their new love", "Both partners ignore red flags", "The relationship moves slowly"], correctAnswer: 1, explanation: "During courtship, the ADHD partner often hyperfocuses on their new love, showering them with attention, affection, and romantic gestures. The novelty and excitement of a new relationship provides the stimulation that captures ADHD attention. However, once the relationship becomes routine and novelty wears off, this hyperfocus typically ends abruptly, leaving the non-ADHD partner feeling abandoned and confused.", category: "Relationship Patterns" },
  { id: 7, question: "What is the 'three-legged stool' of ADHD treatment?", options: ["Diet, exercise, sleep", "Medication, behavioral changes, interaction strategies", "Therapy, support groups, medication", "Mindfulness, organization, communication"], correctAnswer: 1, explanation: "Optimal ADHD treatment includes three 'legs': physical changes (medication), behavioral changes (habits and routines), and interaction strategies with your spouse. Like a three-legged stool, all three are needed for stability—removing any one makes the stool unstable. Medication alone won't fix relationship patterns, and behavioral changes are much harder without medication support.", category: "Treatment" },
  { id: 8, question: "What does 'try differently, not harder' mean in ADHD management?", options: ["Give up on difficult tasks", "Create ADHD-sensitive routines", "Work longer hours", "Delegate all responsibilities"], correctAnswer: 1, explanation: "This principle means creating ADHD-sensitive routines that work WITH the brain, not against it. Simply trying harder at strategies that don't account for ADHD leads to frustration and failure. Instead, use external reminders, break tasks into smaller pieces, add elements of novelty or interest, and create systems that don't rely on memory or willpower alone.", category: "Strategy" },
  { id: 9, question: "What is the ACBD rule?", options: ["Always Consider Both Decisions", "Always Consult Before Deciding", "Act Carefully Before Doing", "Assess Consequences Before Deciding"], correctAnswer: 1, explanation: "ACBD stands for 'Always Consult Before Deciding'—a simple rule that helps avoid conflicts around issues of autonomy. It doesn't mean you can't make decisions; it means communicating with your partner before making decisions that affect both of you. This prevents the non-ADHD partner from feeling blindsided and the ADHD partner from feeling controlled.", category: "Communication" },
  { id: 10, question: "What are the Five Core Concerns in negotiation?", options: ["Money, time, space, respect, love", "Appreciation, Affiliation, Autonomy, Status, Role", "Trust, honesty, loyalty, commitment, patience", "Communication, compromise, compassion, consistency, connection"], correctAnswer: 1, explanation: "The Five Core Concerns are Appreciation (feeling valued), Affiliation (feeling connected), Autonomy (feeling respected as independent), Status (feeling your position is acknowledged), and Role (feeling your contributions matter). Meeting these basic human needs prevents conflict. When any of these concerns is threatened, people become defensive and communication breaks down.", category: "Communication" },
  { id: 11, question: "What is validation in the context of ADHD relationships?", options: ["Agreeing with everything your partner says", "Acknowledging your partner's logic is internally consistent", "Proving your partner wrong", "Ignoring disagreements"], correctAnswer: 1, explanation: "Validation is acknowledging your partner's logic is internally consistent, even if you disagree with their conclusion. It's saying 'I can see why you feel that way given your perspective' without necessarily agreeing. Validation is not agreement—it's recognition that your partner's viewpoint makes sense from their position. This creates safety for honest communication.", category: "Communication" },
  { id: 12, question: "Why is the parent-child dynamic particularly damaging to intimacy?", options: ["It creates financial stress", "It's impossible to be sexually attracted to a parent figure", "It leads to social isolation", "It causes health problems"], correctAnswer: 1, explanation: "The parent-child dynamic is devastating because it's almost impossible to be sexually attracted to a parent figure. When one partner takes on a parental role—managing, reminding, criticizing—and the other becomes childlike—irresponsible, defensive, avoidant—romantic and sexual connection dies. Both partners lose respect for themselves and each other in these roles.", category: "Relationship Patterns" },
  { id: 13, question: "What is 'emotional hyper-arousal' in ADHD?", options: ["Excessive happiness", "Trouble regulating emotions, especially negative ones", "Lack of emotional response", "Constant excitement"], correctAnswer: 1, explanation: "Emotional hyper-arousal means people with ADHD have trouble regulating emotions and are easily triggered into irritability, frustration, or anger over minor things. The same brain differences that affect attention also affect emotional regulation. Emotions may come on faster, feel more intense, and be harder to calm down from. This is a neurological feature, not a character flaw.", category: "Understanding ADHD" },
  { id: 14, question: "What should personal boundaries focus on?", options: ["Thing issues like chores", "People issues like respect and autonomy", "Financial matters", "Time management"], correctAnswer: 1, explanation: "Effective boundaries focus on people issues (respect, autonomy, values) rather than 'thing' issues like who does the dishes. Thing issues can be negotiated and compromised on; people issues define who you are. A boundary like 'I need to be spoken to respectfully' is about your core values, while 'You must do the dishes every night' is a negotiable task assignment.", category: "Boundaries" },
  { id: 15, question: "What is the 'gift of attention'?", options: ["Buying presents for your spouse", "Validating your spouse by giving them focused attention", "Paying attention to household tasks", "Monitoring your spouse's behavior"], correctAnswer: 1, explanation: "The gift of attention means validating your spouse by giving them focused, undivided attention. Put away devices, make eye contact, listen without planning your response, and show genuine interest. In our distracted world, and especially in ADHD relationships where attention is often scattered, this focused presence is one of the most powerful ways to make your partner feel loved and valued.", category: "Connection" },
  { id: 16, question: "What is the first step in the Six Steps to a Better Relationship?", options: ["Get treatment", "Set boundaries", "Cultivate empathy", "Improve communication"], correctAnswer: 2, explanation: "Step 1 is Cultivate Empathy—understanding what it's like to be in your partner's shoes, whether they have ADHD or not. Empathy is foundational because without it, other strategies feel like techniques rather than genuine connection. Both partners need to understand each other's struggles: the ADHD partner's neurological challenges and the non-ADHD partner's exhaustion and frustration.", category: "Six Steps" },
  { id: 17, question: "Why do many people with ADHD hide shame?", options: ["They don't experience shame", "Years of criticism have made them develop coping mechanisms", "They're naturally confident", "Shame is not related to ADHD"], correctAnswer: 1, explanation: "Many people with ADHD hide a large amount of shame, sometimes compensating with bluster, defensiveness, or retreat. This shame comes from years of criticism, failure, and feeling 'different.' They've often developed a 'kit of behaviors' including unhealthy coping mechanisms like lying about mistakes or deflecting blame—these are survival strategies, not character flaws.", category: "Understanding ADHD" },
  { id: 18, question: "What improves relationship feelings more than just spending time together?", options: ["Watching TV together", "Doing new and exciting activities together", "Having serious conversations", "Working on projects separately"], correctAnswer: 1, explanation: "Research shows that doing new and exciting activities together improves relationship feelings more than just spending time together in routine ways. Novelty activates the same brain systems involved in early romantic attraction. This is especially relevant for ADHD relationships because the ADHD partner is naturally drawn to novelty—channeling this into shared adventures benefits both partners.", category: "Connection" },
  { id: 19, question: "What is 'conflict intimacy'?", options: ["Fighting frequently", "Conversations where both speak non-aggressively while the other listens non-defensively", "Avoiding all conflict", "Competing to win arguments"], correctAnswer: 1, explanation: "Conflict intimacy involves conversations where both partners speak non-aggressively while the other listens non-defensively. It's the ability to discuss difficult topics while maintaining connection and respect. The goal is understanding, not winning. This kind of communication builds trust because both partners know they can raise concerns without the conversation becoming destructive.", category: "Communication" },
  { id: 20, question: "What should non-ADHD spouses stop doing according to the book?", options: ["Supporting their partner", "Diagnosing their partner's ADHD", "Communicating their needs", "Setting boundaries"], correctAnswer: 1, explanation: "Non-ADHD spouses should stop diagnosing their partner's ADHD—constantly pointing out what's 'ADHD behavior' and what isn't. Instead, focus on specific relationship issues and your own behavior. Constant diagnosis feels like criticism and puts the non-ADHD partner in an expert/patient role that damages equality in the relationship.", category: "Strategy" },
  { id: 21, question: "What neurotransmitter is primarily involved in ADHD?", options: ["Serotonin", "Dopamine", "Norepinephrine", "GABA"], correctAnswer: 1, explanation: "ADHD has a biological basis involving dysregulation of the reward system, primarily dopamine. The ADHD brain has differences in dopamine production, release, and reuptake. This affects motivation, attention, and reward processing. Understanding this helps partners see ADHD as a brain-based condition rather than a character flaw or choice.", category: "Understanding ADHD" },
  { id: 22, question: "What is the 'exhaustion factor' for non-ADHD spouses?", options: ["Physical tiredness from exercise", "Mental fatigue from work", "Carrying the bulk of household and family responsibilities", "Sleep deprivation"], correctAnswer: 2, explanation: "The exhaustion factor comes from carrying the bulk of household and family responsibilities while often working full-time. Non-ADHD spouses frequently describe feeling like 'single parents' or 'household slaves.' This chronic exhaustion leads to resentment, depression, and loss of self. It's a legitimate experience that needs to be acknowledged and addressed.", category: "Non-ADHD Experience" },
  { id: 23, question: "What natural ADHD trait can add fun to relationships?", options: ["Forgetfulness", "Spontaneity", "Hyperfocus", "Time blindness"], correctAnswer: 1, explanation: "Spontaneity is a natural ADHD trait that can be leveraged to add fun and excitement to relationships. While ADHD creates many challenges, it also brings strengths. The ability to be spontaneous, creative, and enthusiastic can inject energy into a relationship. Building on these strengths rather than only focusing on weaknesses creates a more balanced and positive dynamic.", category: "Connection" },
  { id: 24, question: "What do people with ADHD most strongly desire emotionally?", options: ["To be in control", "To be loved and accepted as they are", "To be left alone", "To be proven right"], correctAnswer: 1, explanation: "One of the strongest emotional desires for people with ADHD is to be loved and accepted as they are, in spite of their imperfections. Years of criticism and feeling 'different' create a deep longing for unconditional acceptance. When partners can separate the person from the symptoms and show love for who they truly are, it creates profound healing.", category: "ADHD Experience" },
  { id: 25, question: "What is the 'little voice' that ADHD partners often hear?", options: ["Encouragement to try harder", "Suggestions they might fail", "Reminders of past successes", "Motivation to change"], correctAnswer: 1, explanation: "Many people with ADHD have a 'little voice' suggesting they might fail—'Why bother trying? You'll just mess it up anyway.' This voice comes from years of criticism and failure experiences. It drives avoidance behaviors and can make the ADHD partner reluctant to try new approaches. Recognizing and addressing this internal critic is part of healing.", category: "Understanding ADHD" },
  { id: 26, question: "What is the 'little voice' that non-ADHD partners often hear?", options: ["'Everything will be fine'", "'If you don't take care of this, everything will fall apart'", "'Let it go'", "'Trust your partner'"], correctAnswer: 1, explanation: "Non-ADHD partners often have a voice whispering 'If you don't take care of this, everything will fall apart.' This voice drives the over-functioning and controlling behaviors that contribute to the parent-child dynamic. It comes from years of disappointment and having to pick up the pieces. Recognizing this voice helps non-ADHD partners step back and allow their partner more responsibility.", category: "Non-ADHD Experience" },
  { id: 27, question: "What is the role of medication in ADHD treatment?", options: ["It's a complete solution", "It's a 'jump-start' that makes changing habits easier", "It's unnecessary", "It replaces behavioral changes"], correctAnswer: 1, explanation: "Medication is a 'jump-start' that makes changing habits much easier by addressing brain chemistry differences. It improves focus, reduces impulsivity, and can help with emotional regulation. However, it's not a 'magic pill'—it doesn't teach new skills, repair relationship damage, or create new habits. Medication enables other changes but doesn't replace them.", category: "Treatment" },
  { id: 28, question: "What happens when one partner pushes harder for behavioral changes?", options: ["The other partner changes faster", "The other partner resists more", "Both partners improve", "Nothing changes"], correctAnswer: 1, explanation: "Behavioral changes must be voluntary—the harder one partner pushes, the more the other resists. This is a fundamental principle of change in relationships. Nagging, criticizing, and controlling don't produce lasting change; they produce defensiveness and resentment. Change happens when both partners feel respected and choose to grow.", category: "Strategy" },
  { id: 29, question: "What should trust be based on in ADHD relationships?", options: ["Perfect follow-through", "Evidence that your partner is managing ADHD to the best of their ability", "Past behavior", "Promises made"], correctAnswer: 1, explanation: "Trust can't be based on perfect follow-through because ADHD makes consistent follow-through difficult. Instead, base trust on evidence that your partner is managing ADHD to the best of their ability—are they taking medication, using strategies, trying new approaches, acknowledging when they fall short? This realistic standard allows trust to rebuild while acknowledging ADHD realities.", category: "Relationships" },
  { id: 30, question: "What is the hardest part of communication according to the book?", options: ["Finding the right words", "Tone of voice", "Timing", "Body language"], correctAnswer: 1, explanation: "Your tone of voice is the hardest part of communication—frustration and anger trigger defensive responses regardless of what words you use. You can say the 'right' things in the wrong tone and completely undermine your message. Practicing calm delivery, even when upset, is essential for productive communication in ADHD relationships.", category: "Communication" },
  { id: 31, question: "What are verbal cues used for?", options: ["Ending conversations", "Redirecting escalating conversations", "Starting difficult topics", "Avoiding communication"], correctAnswer: 1, explanation: "Verbal cues are agreed-upon words or phrases to redirect conversations that are escalating or to address sensitive topics. Examples include 'I need a break,' 'Let's pause,' or a specific code word. Both partners must agree to respect the cue. This prevents conversations from becoming destructive and allows both partners to return when calm.", category: "Communication" },
  { id: 32, question: "Why should couples schedule specific times for difficult topics?", options: ["To avoid them entirely", "To lighten the atmosphere for the rest of the week", "To have witnesses present", "To prepare arguments"], correctAnswer: 1, explanation: "Scheduling specific times for difficult topics lightens the atmosphere for the rest of the week. When you know there's a designated time to discuss concerns, you don't need to bring them up constantly. Both partners can mentally prepare, and the conversation is less likely to feel like an ambush. This creates more peace in daily interactions.", category: "Strategy" },
  { id: 33, question: "What should come first: connection or getting things done?", options: ["Getting things done", "Connection", "Both equally", "Neither"], correctAnswer: 1, explanation: "Put strengthening connections first, getting things done second. Strong threads of connection make everything easier—tasks get done more smoothly when partners feel connected and are working as a team. Prioritizing efficiency over connection damages the relationship foundation that makes cooperation possible.", category: "Connection" },
  { id: 34, question: "What is relatively unimportant compared to connection?", options: ["Communication", "Efficiency", "Boundaries", "Treatment"], correctAnswer: 1, explanation: "Efficiency is relatively unimportant compared to connection and respect, except when children rely on you for basic needs. Many couples sacrifice their relationship on the altar of getting things done. A less efficient household with a strong relationship is better than a perfectly run home with disconnected, resentful partners.", category: "Relationships" },
  { id: 35, question: "What should boundaries NOT be created in response to?", options: ["Personal values", "Arguments or intended to punish", "Self-reflection", "Mutual discussion"], correctAnswer: 1, explanation: "Boundaries should not be created in response to arguments or intended to punish—they should reflect your core values and who you want to be. A boundary created in anger ('Fine, I'm never helping you again!') is a punishment, not a boundary. True boundaries come from calm reflection about what you need to maintain your sense of self.", category: "Boundaries" },
  { id: 36, question: "What does 'declaring autonomy without declaring war' mean?", options: ["Being independent and disconnected", "Being autonomous but staying connected around positive things", "Avoiding all conflict", "Giving up independence"], correctAnswer: 1, explanation: "You can declare autonomy without declaring war—be autonomous but stay connected around positive things. Autonomy doesn't mean disconnection. You can say 'I need to make this decision for myself' while still maintaining warmth and connection in other areas. Independence and intimacy can coexist.", category: "Relationships" },
  { id: 37, question: "What type of help should couples seek?", options: ["Any available therapist", "Help from people who understand ADHD", "Self-help only", "Family advice only"], correctAnswer: 1, explanation: "Seek help from people who understand ADHD—general therapists may not understand the specific dynamics of ADHD relationships. They might inadvertently blame the ADHD partner or miss how ADHD symptoms create relationship patterns. ADHD-informed therapists understand the neurological basis and can offer appropriate strategies.", category: "Treatment" },
  { id: 38, question: "Are ADHD symptoms the person's true qualities?", options: ["Yes, they define the person", "No, they're the opposite of who they really are when managed", "Sometimes", "It depends on the symptom"], correctAnswer: 1, explanation: "ADHD symptoms are NOT the person's true qualities—they're actually the opposite of who they really are when managed. The person who seems unreliable may be deeply committed; the one who seems uncaring may love deeply. When ADHD is properly treated, the true person emerges. Separating the person from the symptoms is essential for both partners.", category: "Understanding ADHD" },
  { id: 39, question: "What is the ultimate goal for couples dealing with ADHD?", options: ["To eliminate all symptoms", "To take control of ADHD together so you can thrive", "To live separately", "To accept dysfunction"], correctAnswer: 1, explanation: "The ultimate goal is to take control of ADHD together so you can thrive and become, once again, the partners you hoped to be. This means working as a team against ADHD rather than against each other. It's not about eliminating symptoms entirely—that's not realistic—but about managing them together so they don't control your relationship.", category: "Progress" },
  { id: 40, question: "What do non-ADHD spouses often describe feeling like?", options: ["A team player", "A single parent or household slave", "A supportive partner", "A best friend"], correctAnswer: 1, explanation: "Non-ADHD spouses often describe feeling like a 'single parent' or 'household slave' due to carrying most responsibilities. They feel alone in managing the household and family, even though they're married. This experience is valid and needs to be acknowledged. It's not about blame—it's about understanding the real impact of ADHD on both partners.", category: "Non-ADHD Experience" },
  { id: 41, question: "What do ADHD spouses often feel they can never do?", options: ["Relax", "Anything right", "Have fun", "Be spontaneous"], correctAnswer: 1, explanation: "ADHD spouses often feel like they can never do anything right due to constant criticism. No matter how hard they try, it seems like they're always falling short. This feeling comes from years of negative feedback and contributes to shame, avoidance, and defensive behaviors. Creating an environment where effort is acknowledged helps break this pattern.", category: "ADHD Experience" },
  { id: 42, question: "What is a 'race-car brain'?", options: ["A brain that's very fast at everything", "A brain that lacks good brakes, leading to impulsivity", "A brain that's competitive", "A brain that needs constant stimulation"], correctAnswer: 1, explanation: "People with ADHD may have a 'race-car brain that lacks good brakes,' leading to impulsivity and difficulty stopping once started. The brain can go fast and process a lot, but slowing down, stopping, or changing direction is challenging. This explains impulsive decisions, difficulty disengaging from activities, and trouble with transitions.", category: "Understanding ADHD" },
  { id: 43, question: "What happens when the novelty wears off in ADHD relationships?", options: ["The relationship improves", "Hyperfocus typically ends abruptly", "Both partners become more committed", "Communication improves"], correctAnswer: 1, explanation: "Once the relationship becomes routine and novelty wears off, hyperfocus typically ends abruptly. The ADHD brain is drawn to novelty and stimulation; a new relationship provides both. When the relationship becomes familiar, it no longer captures attention the same way. This shift can feel devastating to the non-ADHD partner who experienced intense attention during courtship.", category: "Relationship Patterns" },
  { id: 44, question: "What do non-ADHD partners often fantasize about?", options: ["More excitement", "Stability, mature decision-making, and calmness", "Adventure", "More spontaneity"], correctAnswer: 1, explanation: "Many non-ADHD partners fantasize about leaving, dreaming of stability, mature decision-making, and calmness. They imagine a life without the chaos, unpredictability, and constant management that ADHD brings. These fantasies are a sign of exhaustion and unmet needs, not necessarily a desire to leave. Addressing the underlying issues can reduce these escape fantasies.", category: "Non-ADHD Experience" },
  { id: 45, question: "What do non-ADHD partners often hate about themselves?", options: ["Their patience", "Becoming angry, nagging, and controlling", "Their organization skills", "Their communication style"], correctAnswer: 1, explanation: "Non-ADHD partners often hate who they've become: angry, nagging, controlling. They didn't enter the relationship wanting to be this person. The parent-child dynamic and chronic frustration transform them into someone they don't recognize or like. Recognizing this self-loathing is important—it shows the non-ADHD partner is also suffering and needs support.", category: "Non-ADHD Experience" },
  { id: 46, question: "What is the 'kit of behaviors' that ADHD partners develop?", options: ["Organizational skills", "Unhealthy coping mechanisms like lying or deflecting blame", "Communication strategies", "Time management techniques"], correctAnswer: 1, explanation: "ADHD partners often develop a 'kit of behaviors' including unhealthy coping mechanisms like lying, covering for mistakes, or deflecting blame. These are survival strategies developed over years of criticism and failure—ways to avoid the pain of yet another disappointment or confrontation. Understanding this helps partners see these behaviors as symptoms, not character flaws.", category: "ADHD Experience" },
  { id: 47, question: "What might be the 'logical' choice for someone with untreated ADHD?", options: ["To try harder", "To not try, to avoid risking failure", "To seek help immediately", "To communicate more"], correctAnswer: 1, explanation: "The 'logical' choice for someone with untreated ADHD might be to not try, to avoid risking failure. If every attempt leads to criticism and disappointment, why try? This avoidance is self-protective but creates more problems. It looks like laziness or not caring, but it's actually a response to repeated failure. Treatment and a supportive environment can break this pattern.", category: "ADHD Experience" },
  { id: 48, question: "What is an 'impenetrable defensive shell'?", options: ["A communication technique", "A retreat response when triggered by past pain", "A boundary-setting method", "A treatment approach"], correctAnswer: 1, explanation: "People with ADHD may retreat into an 'impenetrable defensive shell' when triggered by past pain. This shutdown response protects them from the hurt of criticism but makes communication impossible. Understanding that this retreat is a pain response, not rejection or indifference, helps partners approach with compassion rather than frustration.", category: "ADHD Experience" },
  { id: 49, question: "What is Step 2 of the Six Steps?", options: ["Get treatment", "Address obstacle emotions", "Set boundaries", "Cultivate empathy"], correctAnswer: 1, explanation: "Step 2 is Address Obstacle Emotions—working through anger, fear, shame, hopelessness, and denial that block progress. These emotions are natural responses to years of struggle, but they prevent healing if not addressed. Both partners carry obstacle emotions that need to be acknowledged and worked through before other strategies can be effective.", category: "Six Steps" },
  { id: 50, question: "What is Step 3 of the Six Steps?", options: ["Improve communication", "Get treatment for both partners", "Reignite romance", "Set boundaries"], correctAnswer: 1, explanation: "Step 3 is Get Treatment for Both—ADHD treatment for the ADHD partner and support for the non-ADHD partner's depression, anxiety, or anger. Both partners have been affected by the ADHD dynamic and both need healing. The non-ADHD partner's issues are just as real and deserving of treatment as the ADHD itself.", category: "Six Steps" },
  { id: 51, question: "What is Step 4 of the Six Steps?", options: ["Set boundaries", "Reignite romance", "Improve communication", "Cultivate empathy"], correctAnswer: 2, explanation: "Step 4 is Improve Communication—practice learning conversations, validation, and verbal cues. With empathy established, emotions addressed, and treatment underway, couples can now work on how they talk to each other. This includes specific techniques designed for ADHD relationships where attention, emotional regulation, and impulsivity affect conversations.", category: "Six Steps" },
  { id: 52, question: "What is Step 5 of the Six Steps?", options: ["Reignite romance", "Set boundaries", "Get treatment", "Cultivate empathy"], correctAnswer: 1, explanation: "Step 5 is Set Boundaries—establish values and behaviors essential to who you want to be. Boundaries protect both partners' sense of self while respecting autonomy. They're not about controlling your partner but about defining what you need to be the person you want to be in the relationship.", category: "Six Steps" },
  { id: 53, question: "What is Step 6 of the Six Steps?", options: ["Improve communication", "Set boundaries", "Reignite romance", "Get treatment"], correctAnswer: 2, explanation: "Step 6 is Reignite Romance—rebuild connection through new adventures, celebration, and the gift of attention. With the foundation of empathy, emotional healing, treatment, communication, and boundaries in place, couples can focus on rebuilding the romantic connection that brought them together. This step transforms the relationship from functional to fulfilling.", category: "Six Steps" },
  { id: 54, question: "What happens if you remove one leg from the three-legged stool of treatment?", options: ["The stool remains stable", "The stool becomes unstable", "Treatment improves", "Nothing changes"], correctAnswer: 1, explanation: "All three legs of treatment are needed for stability; removing any one makes the stool unstable. Medication without behavioral change leads to frustration ('I'm taking pills but nothing's different'). Behavioral change without medication is much harder. Both without interaction strategies leaves the relationship struggling. The three work together synergistically.", category: "Treatment" },
  { id: 55, question: "What is a 'learning conversation'?", options: ["A lecture about ADHD", "Understanding each other's perspectives without judgment", "A debate about who's right", "A therapy session"], correctAnswer: 1, explanation: "Learning conversations focus on understanding each other's perspectives without judgment. The goal is to learn how your partner sees things, not to convince them you're right. You ask questions, listen to understand (not to respond), and acknowledge that your partner's perspective is as valid as yours. This creates safety and connection.", category: "Communication" },
  { id: 56, question: "How likely are people with ADHD to divorce compared to others?", options: ["Half as likely", "Equally likely", "Almost twice as likely", "Three times as likely"], correctAnswer: 2, explanation: "People with ADHD are almost twice as likely to divorce as those without ADHD. This statistic reflects the significant strain ADHD places on relationships when not properly understood and managed. However, with the right knowledge, treatment, and strategies, ADHD couples can build strong, lasting relationships.", category: "Statistics" },
  { id: 57, question: "What should couples post photos of to reinforce positive memories?", options: ["Individual achievements", "Adventures together", "Daily routines", "Work accomplishments"], correctAnswer: 1, explanation: "Posting photos of adventures together helps reinforce positive memories. Visual reminders of good times together strengthen the bond and provide evidence that the relationship has positive aspects. This is especially helpful during difficult periods when it's easy to forget the good times.", category: "Connection" },
  { id: 58, question: "What should couples get often to focus on each other?", options: ["New hobbies", "A babysitter", "Separate vacations", "Therapy appointments"], correctAnswer: 1, explanation: "Get a babysitter often to focus on each other and rebuild connection. Regular time alone together, without children or other responsibilities, is essential for maintaining the romantic relationship. This dedicated couple time allows for the new adventures and focused attention that rebuild intimacy.", category: "Connection" },
  { id: 59, question: "What is the best defense against destructive patterns?", options: ["Avoiding all conflict", "Treating ADHD effectively and creating safe communication", "Living separately", "Ignoring problems"], correctAnswer: 1, explanation: "The best defense against destructive patterns is treating ADHD effectively and creating a safe communication environment. When ADHD is managed and both partners feel safe to express themselves, the destructive cycles lose their power. Treatment reduces symptoms while safe communication prevents the escalation that damages relationships.", category: "Strategy" },
  { id: 60, question: "What should you acknowledge about past pain?", options: ["It doesn't exist", "Its legitimacy while recognizing today's pain doesn't mean returning to the past", "It should be forgotten", "It defines the future"], correctAnswer: 1, explanation: "Acknowledge the legitimacy of past pain while recognizing that experiencing pain today doesn't mean returning to the past. Both partners have been hurt, and that pain is real. However, you are in control of your responses now. The past informs but doesn't have to determine the future. Healing requires acknowledging pain while choosing new responses.", category: "Healing" },
  { id: 61, question: "Who is in control of your responses now?", options: ["Your partner", "Your past", "You", "Your ADHD"], correctAnswer: 2, explanation: "You are in control of your responses now—healing requires taking responsibility for how you respond, regardless of what your partner does or what happened in the past. This doesn't mean past pain wasn't real or that your partner doesn't need to change. It means you have agency over your own reactions and choices.", category: "Healing" },
  { id: 62, question: "What must both partners address for healing?", options: ["Only external problems", "Their internal voices and past wounds", "Only ADHD symptoms", "Only communication issues"], correctAnswer: 1, explanation: "Healing requires both partners to address their internal voices and past wounds. The ADHD partner's voice of failure and the non-ADHD partner's voice of 'everything will fall apart' both drive destructive behaviors. Individual healing supports relationship healing—you can't fully show up for your partner while carrying unaddressed wounds.", category: "Healing" },
  { id: 63, question: "What is the first critical point for success?", options: ["Get treatment", "Eradicate the blame game", "Set boundaries", "Improve communication"], correctAnswer: 1, explanation: "The first critical point is to eradicate the blame game completely. Blame is destructive and doesn't lead to positive change—it creates defensiveness and resentment. Moving from 'whose fault is this?' to 'how do we solve this together?' transforms the relationship dynamic from adversarial to collaborative.", category: "Critical Points" },
  { id: 64, question: "What is the second critical point for success?", options: ["Step out of the cycle of anger", "Get treatment", "Set boundaries", "Celebrate successes"], correctAnswer: 0, explanation: "The second critical point is to step out of the cycle of anger. Neither expressing anger explosively nor suppressing it works—both are destructive. Instead, recognize anger as a signal, take breaks when needed, and address underlying issues calmly. Breaking the anger cycle creates space for productive communication.", category: "Critical Points" },
  { id: 65, question: "What should the ADHD spouse take responsibility for?", options: ["Everything in the relationship", "Their symptoms", "Their partner's feelings", "Household finances only"], correctAnswer: 1, explanation: "The ADHD spouse must take responsibility for their symptoms—not blame themselves for having ADHD, but own the impact of symptoms on the relationship and actively work to manage them. This means pursuing treatment, using strategies, and acknowledging when symptoms affect their partner, without shame or defensiveness.", category: "Responsibility" },
  { id: 66, question: "What must the non-ADHD spouse become?", options: ["More controlling", "Less controlling", "More organized", "More critical"], correctAnswer: 1, explanation: "The non-ADHD spouse must become less controlling. The urge to control comes from legitimate frustration and fear, but it damages the relationship and prevents the ADHD partner from developing responsibility. Stepping back is scary but necessary for breaking the parent-child dynamic and allowing both partners to be adults.", category: "Responsibility" },
  { id: 67, question: "What type of routines should couples create?", options: ["Strict schedules", "ADHD-sensitive routines", "Separate routines", "No routines"], correctAnswer: 1, explanation: "Create ADHD-sensitive routines that work with the ADHD brain, not against it. This means using external reminders, adding interest or novelty, breaking tasks into smaller pieces, and not relying on memory or willpower alone. Routines that account for ADHD realities are sustainable; those that don't are destined to fail.", category: "Strategy" },
  { id: 68, question: "What should couples schedule time for?", options: ["Arguments", "Connection", "Separate activities", "Work"], correctAnswer: 1, explanation: "Schedule time for connection to maintain and rebuild the relationship. In busy lives, connection doesn't happen automatically—it needs to be prioritized and protected. Regular date nights, daily check-ins, and dedicated couple time ensure the relationship gets attention, not just the tasks of life.", category: "Connection" },
  { id: 69, question: "What should couples respect about each other?", options: ["Only opinions", "Need for space", "Only achievements", "Only feelings"], correctAnswer: 1, explanation: "Respect each other's need for space without giving up underlying connections. Both partners may need alone time to recharge, process emotions, or pursue individual interests. Respecting this need doesn't mean disconnection—it means understanding that some retreat provides strength for connection.", category: "Relationships" },
  { id: 70, question: "How does some retreat affect relationships?", options: ["It always damages them", "It provides strength", "It has no effect", "It ends relationships"], correctAnswer: 1, explanation: "Some retreat provides strength—respecting space is important for both partners. Time apart allows for individual processing, reduces intensity, and can actually strengthen connection by preventing burnout. The key is that retreat is temporary and both partners return to connection.", category: "Relationships" },
  { id: 71, question: "What should couples take control of together?", options: ["Each other's behavior", "ADHD", "Finances only", "Social life"], correctAnswer: 1, explanation: "Take control of ADHD together so you can thrive. This means approaching ADHD as a shared challenge rather than one partner's problem. When both partners work together against ADHD—rather than against each other—they become a team. This collaborative stance transforms the relationship dynamic.", category: "Progress" },
  { id: 72, question: "What can couples become again with proper management?", options: ["Strangers", "The partners they hoped to be", "Roommates", "Co-parents only"], correctAnswer: 1, explanation: "Couples can become, once again, the partners they hoped to be. The relationship you dreamed of is still possible. With understanding, treatment, and the right strategies, couples can move past the damage caused by unmanaged ADHD and build the loving, connected partnership they both want.", category: "Progress" },
  { id: 73, question: "What may non-ADHD spouses develop as a result of relationship stress?", options: ["ADHD", "Depression, anxiety, or anger issues", "Better coping skills", "Improved patience"], correctAnswer: 1, explanation: "The non-ADHD spouse may develop depression, anxiety, or anger issues as a result of chronic relationship stress. These are legitimate conditions that need treatment, not just side effects to be ignored. The non-ADHD partner's mental health matters and affects their ability to participate in relationship healing.", category: "Non-ADHD Experience" },
  { id: 74, question: "What is the relationship between ADHD and laziness?", options: ["ADHD is a form of laziness", "ADHD has nothing to do with laziness—it's biological", "Laziness causes ADHD", "They're the same thing"], correctAnswer: 1, explanation: "ADHD has a biological basis—it's not laziness. The ADHD brain has measurable differences in structure and function, particularly in areas related to attention, impulse control, and reward processing. What looks like laziness is often the result of executive function deficits, not lack of effort or caring.", category: "Understanding ADHD" },
  { id: 75, question: "What should couples be aware of regarding shame and fear?", options: ["They don't exist in ADHD relationships", "Both partners experience them and they affect behavior", "Only the ADHD partner feels them", "They're not important"], correctAnswer: 1, explanation: "Be aware of shame and fear—both partners experience them and they drive destructive behaviors. The ADHD partner carries shame from years of failure; the non-ADHD partner carries fear of things falling apart. Recognizing these emotions in yourself and your partner creates compassion and opens space for healing.", category: "Emotions" },
  { id: 76, question: "What is one way to validate your spouse?", options: ["Agree with everything", "Give them the gift of attention", "Solve their problems", "Give advice"], correctAnswer: 1, explanation: "Validate your spouse with the gift of attention—make them feel seen and valued. Put away distractions, make eye contact, listen fully, and show genuine interest. This focused presence communicates 'You matter to me' more powerfully than words. In our distracted world, attention is one of the greatest gifts we can give.", category: "Connection" },
  { id: 77, question: "Why is change gradual in ADHD relationships?", options: ["People don't want to change", "Progress requires patience and persistence", "Change is impossible", "Only medication works"], correctAnswer: 1, explanation: "Remember that change takes time—progress is gradual and requires patience and persistence. Years of patterns don't reverse overnight. There will be setbacks and frustrations. Expecting immediate transformation sets everyone up for disappointment. Celebrate small wins and trust the process.", category: "Progress" },
  { id: 78, question: "What should couples do with their progress?", options: ["Ignore it", "Applaud and celebrate it", "Minimize it", "Compare it to others"], correctAnswer: 1, explanation: "Applaud your progress and celebrate small wins—recognizing progress reinforces positive changes. It's easy to focus on what's still wrong and miss how far you've come. Celebrating progress builds momentum, increases motivation, and reminds both partners that change is possible.", category: "Progress" },
  { id: 79, question: "What is the relationship between the relationship and logistics?", options: ["Focus only on logistics", "Focus on the relationship, not just logistics", "They're equally important", "Logistics should come first"], correctAnswer: 1, explanation: "Reestablish connection—focus on the relationship, not just logistics. Many couples become so focused on managing tasks and responsibilities that they forget to nurture their connection. The relationship is the foundation; when it's strong, logistics become easier. When it's weak, even simple tasks become sources of conflict.", category: "Connection" },
  { id: 80, question: "What does believing your partner involve?", options: ["Accepting everything as truth", "Listening to understand their experience", "Ignoring their perspective", "Questioning everything"], correctAnswer: 1, explanation: "Believe your partner and listen to understand their experience. This doesn't mean accepting everything as objective truth—it means accepting that their experience is real for them. When your partner says they're trying, believe them. When they describe their struggles, accept that's how it feels. This creates safety for honest communication.", category: "Communication" },
  { id: 81, question: "What should guide all negotiations according to the book?", options: ["Who's right", "The Five Core Concerns", "Past behavior", "Financial considerations"], correctAnswer: 1, explanation: "The Five Core Concerns should guide all negotiations: Appreciation, Affiliation, Autonomy, Status, and Role. When these basic human needs are met, people are more flexible and cooperative. When they're threatened, people become defensive. Checking whether your approach honors these concerns prevents unnecessary conflict.", category: "Communication" },
  { id: 82, question: "What is the purpose of boundaries?", options: ["To control your partner", "To protect your sense of self while respecting your partner's autonomy", "To win arguments", "To punish bad behavior"], correctAnswer: 1, explanation: "Boundaries protect your sense of self while respecting your partner's autonomy. They define what you need to be the person you want to be, without trying to control your partner. Good boundaries say 'This is what I need' rather than 'This is what you must do.' They create clarity and prevent resentment.", category: "Boundaries" },
  { id: 83, question: "What are boundaries about?", options: ["Controlling your partner", "Who you want to be", "Winning", "Punishment"], correctAnswer: 1, explanation: "Boundaries are about who you want to be, not about controlling your partner. They reflect your values and what you need to maintain your integrity and well-being. A boundary like 'I will speak respectfully even when angry' is about your behavior. Boundaries empower you rather than trying to change your partner.", category: "Boundaries" },
  { id: 84, question: "What is one of the most powerful tools for rebuilding intimacy?", options: ["Expensive gifts", "The gift of attention", "Separate vacations", "Avoiding conflict"], correctAnswer: 1, explanation: "The gift of attention is one of the most powerful tools for rebuilding intimacy. When you give someone your full, focused attention, you communicate that they matter. In ADHD relationships where attention has often been scattered or absent, this focused presence can be profoundly healing.", category: "Connection" },
  { id: 85, question: "What type of activities improve feelings more than routine time together?", options: ["Watching TV", "New and exciting activities", "Household chores", "Separate hobbies"], correctAnswer: 1, explanation: "Doing new and exciting activities together improves feelings more than just spending time together in routine ways. Research shows that novelty activates brain systems associated with early romantic love. This is especially relevant for ADHD couples—the ADHD partner's draw to novelty can be channeled into relationship-building adventures.", category: "Connection" },
  { id: 86, question: "What should couples build on from ADHD traits?", options: ["Forgetfulness", "Spontaneity", "Disorganization", "Time blindness"], correctAnswer: 1, explanation: "Build on spontaneity—it's a natural ADHD trait that can add fun and excitement to relationships. While ADHD creates challenges, it also brings strengths. The ability to be spontaneous, think creatively, and bring enthusiasm can inject positive energy into a relationship when channeled constructively.", category: "Connection" },
  { id: 87, question: "What is blame described as?", options: ["Helpful feedback", "Destructive and doesn't lead to positive change", "Necessary for growth", "A communication tool"], correctAnswer: 1, explanation: "Blame is destructive and doesn't lead to positive change—eradicate it completely. Blame creates defensiveness, damages trust, and keeps couples stuck in conflict rather than solution. Moving from 'It's your fault' to 'How do we fix this together?' transforms the relationship dynamic.", category: "Strategy" },
  { id: 88, question: "What should couples do with the cycle of anger?", options: ["Express it fully", "Step out of it", "Suppress it", "Ignore it"], correctAnswer: 1, explanation: "Step out of the cycle of anger rather than continuing destructive patterns of expressing or suppressing it. Neither explosive expression nor bottling up anger works—both damage the relationship. Instead, recognize anger as a signal, take breaks when needed, and address underlying issues when calm.", category: "Strategy" },
  { id: 89, question: "What is the relationship between expressing and suppressing anger?", options: ["Expressing is good, suppressing is bad", "Both are destructive patterns", "Suppressing is good, expressing is bad", "Neither matters"], correctAnswer: 1, explanation: "Both expressing and suppressing anger can be destructive—step out of the cycle instead. Explosive anger damages trust and safety. Suppressed anger builds resentment and eventually explodes. The alternative is to acknowledge anger, take space if needed, and address issues calmly and constructively.", category: "Strategy" },
  { id: 90, question: "What does 'time tunnel vision' refer to?", options: ["Seeing the future clearly", "Only experiencing 'now' and 'not now'", "Planning ahead effectively", "Remembering the past well"], correctAnswer: 1, explanation: "Time tunnel vision refers to only experiencing two time zones: 'now' and 'not now.' For people with ADHD, anything not happening right now feels equally distant—whether it's in five minutes or five months. This explains difficulties with deadlines, appointments, and planning that frustrate both partners.", category: "Understanding ADHD" },
  { id: 91, question: "What can feel like abandonment to the non-ADHD partner?", options: ["Setting boundaries", "The end of hyperfocus courtship", "Getting treatment", "Having separate hobbies"], correctAnswer: 1, explanation: "The shift when hyperfocus ends can feel like abandonment to the non-ADHD partner. During courtship, they received intense attention and felt like the center of their partner's world. When that attention shifts, it can feel like rejection or falling out of love, even though it's a neurological pattern, not a change in feelings.", category: "Relationship Patterns" },
  { id: 92, question: "What is hyperfocus related to in ADHD?", options: ["Laziness", "The need for stimulation", "Lack of love", "Intentional behavior"], correctAnswer: 1, explanation: "Hyperfocus is related to ADHD's need for stimulation—not a lack of love or intentional behavior. The ADHD brain is drawn to novel, interesting, stimulating activities. A new relationship provides all of these. When the relationship becomes familiar, it no longer captures attention the same way, but this doesn't mean love has diminished.", category: "Understanding ADHD" },
  { id: 93, question: "Who needs to change to break the parent-child dynamic?", options: ["Only the ADHD spouse", "Only the non-ADHD spouse", "Both partners", "Neither—it's unchangeable"], correctAnswer: 2, explanation: "Breaking the parent-child dynamic requires both partners to change. The ADHD spouse must take more responsibility—not perfectly, but genuinely. The non-ADHD spouse must become less controlling—stepping back even when it's scary. Neither can change the dynamic alone; it takes coordinated effort from both.", category: "Relationship Patterns" },
  { id: 94, question: "What must the ADHD spouse do to break the parent-child dynamic?", options: ["Nothing different", "Take more responsibility", "Become more dependent", "Avoid all tasks"], correctAnswer: 1, explanation: "The ADHD spouse must take more responsibility to break the parent-child dynamic. This means actively managing ADHD symptoms, following through on commitments, and not relying on their partner to manage their life. It's not about being perfect—it's about genuine effort and ownership.", category: "Relationship Patterns" },
  { id: 95, question: "What must the non-ADHD spouse do to break the parent-child dynamic?", options: ["Take more control", "Become less controlling", "Do everything themselves", "Give up entirely"], correctAnswer: 1, explanation: "The non-ADHD spouse must become less controlling to break the parent-child dynamic. This means stepping back from managing their partner's life, allowing natural consequences, and trusting their partner to handle responsibilities. It's scary but necessary for both partners to function as adults.", category: "Relationship Patterns" },
  { id: 96, question: "What do non-ADHD spouses often feel like they're always doing?", options: ["Having fun", "Putting a damper on fun", "Being spontaneous", "Relaxing"], correctAnswer: 1, explanation: "Non-ADHD spouses may feel like the 'kill-joy' who's always putting a damper on fun because they're thinking of practical matters—bills, schedules, responsibilities. While their partner seems carefree, they're carrying the mental load of keeping life running. This role is exhausting and contributes to resentment.", category: "Non-ADHD Experience" },
  { id: 97, question: "What is essential for healing according to the book?", options: ["Ignoring the non-ADHD spouse's experience", "Understanding and validating the non-ADHD spouse's experience", "Focusing only on ADHD symptoms", "Avoiding difficult conversations"], correctAnswer: 1, explanation: "Understanding and validating the non-ADHD spouse's experiences is essential for healing. Their exhaustion, frustration, and pain are real and legitimate. When the ADHD partner can acknowledge the impact of their symptoms without defensiveness, and when the non-ADHD partner feels truly understood, healing becomes possible.", category: "Healing" },
  { id: 98, question: "What should couples remember about experiencing pain today?", options: ["It means returning to the past", "It doesn't mean returning to the past", "It's permanent", "It should be ignored"], correctAnswer: 1, explanation: "Experiencing pain today doesn't mean returning to the past—you are in control now. Past patterns may have created current pain, but you have the power to respond differently. Recognizing that today's struggles don't have to repeat yesterday's patterns is empowering and essential for moving forward.", category: "Healing" },
  { id: 99, question: "What is the key to thriving in an ADHD-affected marriage?", options: ["One partner doing all the work", "Taking control of ADHD together", "Ignoring the condition", "Living separately"], correctAnswer: 1, explanation: "The key is to take control of ADHD together so you can thrive as partners. This means approaching ADHD as a shared challenge, working as a team, and supporting each other through the process. When both partners are committed to understanding and managing ADHD together, the relationship can not only survive but flourish.", category: "Progress" },
  { id: 100, question: "What is the ultimate goal of the six-step recovery process for ADHD marriages?", options: ["Eliminating all ADHD symptoms", "Creating a relationship where both partners feel valued, respected, and connected", "Making the non-ADHD partner fully responsible for management", "Returning to how things were before marriage"], correctAnswer: 1, explanation: "The ultimate goal of the six-step recovery process is creating a relationship where both partners feel valued, respected, and connected. This isn't about 'fixing' ADHD or returning to an idealized past—it's about building something new together. Success means both partners understand ADHD's impact, communicate effectively, share responsibilities appropriately, and maintain the emotional and physical intimacy that makes marriage fulfilling.", category: "Progress" }
];

// Research Resources (27 resources)
export const researchResources: ResearchResource[] = [
  {
    id: 1,
    title: "Marital Adjustment and Marital Conflict in Individuals Diagnosed with ADHD and Their Spouses",
    authors: "Öztürk Y, Özyurt G, Turan S, Mutlu C, Tufan AE, Akay AP",
    year: "2022",
    summary: "This study examines how ADHD symptoms affect marital adjustment and conflict patterns in couples where one partner has ADHD.",
    full_summary: `This groundbreaking 2022 study published in the Journal of Attention Disorders provides crucial insights into how ADHD affects marital relationships. The researchers examined 60 couples where one partner had been diagnosed with ADHD and compared them to 60 control couples without ADHD.

**Key Findings:**

1. **Marital Adjustment**: Couples with an ADHD partner showed significantly lower marital adjustment scores compared to control couples. Both the ADHD partner and their spouse reported reduced satisfaction.

2. **Conflict Patterns**: The study identified specific conflict patterns unique to ADHD-affected marriages:
   - Higher frequency of arguments about household responsibilities
   - More conflicts related to time management and punctuality
   - Increased disagreements about financial decisions
   - Greater tension around parenting approaches

3. **Symptom Severity Correlation**: The severity of ADHD symptoms directly correlated with marital distress. Partners of individuals with more severe inattention symptoms reported the lowest marital satisfaction.

4. **Gender Differences**: When the husband had ADHD, wives reported more distress than when the wife had ADHD. This may relate to traditional gender role expectations around household management.

5. **Protective Factors**: Couples who understood ADHD as a neurological condition rather than a character flaw showed better adjustment. Treatment compliance was also associated with improved marital outcomes.

**Clinical Implications:**

The authors recommend that clinicians treating adult ADHD should routinely assess relationship functioning and consider couples therapy as part of comprehensive treatment. They emphasize that educating both partners about ADHD can reduce blame and improve empathy.

**Methodology:**

The study used validated instruments including the Dyadic Adjustment Scale (DAS) and the Conflict Tactics Scale (CTS). All ADHD diagnoses were confirmed using structured clinical interviews and the Adult ADHD Self-Report Scale (ASRS).`,
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9142016/",
    resource_type: "Scientific Article",
    article_type: "Original Research",
    focus: ["Relationship Dynamics", "Conflict Patterns", "Marital Satisfaction"]
  },
  {
    id: 2,
    title: "The Experiences of Adults with ADHD in Interpersonal Relationships and Online Communities: A Qualitative Study",
    authors: "Sedgwick JA, Merwood A, Asherson P",
    year: "2023",
    summary: "Qualitative research exploring how adults with ADHD experience interpersonal relationships and seek support through online communities.",
    full_summary: ``,
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10399076/",
    resource_type: "Scientific Article",
    article_type: "Original Research",
    focus: ["Relationship Dynamics", "Lived Experience", "Support Systems"]
  },
  {
    id: 3,
    title: "Depressive Symptoms and Quality of Life Among Women Living With a Partner Diagnosed With ADHD",
    authors: "Wymbs BT, Canu WH, Sacchetti GM, Ranson LM",
    year: "2024",
    summary: "Research examining the mental health impact on non-ADHD female partners, including depression and quality of life outcomes.",
    full_summary: ``,
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11520260/",
    resource_type: "Scientific Article",
    article_type: "Original Research",
    focus: ["Non-ADHD Partner Experience", "Mental Health", "Quality of Life"]
  },
  {
    id: 4,
    title: "Adult ADHD-Focused Couple Therapy: Clinical Interventions",
    authors: "Pera G, Robin AL",
    year: "2018",
    summary: "Clinical guide for therapists on evidence-based interventions specifically designed for couples affected by adult ADHD.",
    full_summary: ``,
    link: "https://www.researchgate.net/publication/322694668_Adult_ADHD-Focused_Couple_Therapy_Clinical_Interventions",
    resource_type: "Scientific Article",
    article_type: "Review",
    focus: ["Treatment", "Couples Therapy", "Clinical Practice"]
  },
  {
    id: 5,
    title: "ADHD Symptoms and Adult Romantic Relationships: The Role of Partner Attachment Style, Emotion Recognition, and Personality",
    authors: "Knies KM",
    year: "2018",
    summary: "Doctoral dissertation examining how ADHD symptoms interact with attachment styles and emotional processing in romantic relationships.",
    full_summary: ``,
    link: "https://scholarcommons.sc.edu/cgi/viewcontent.cgi?params=/context/etd/article/5775/&path_info=Knies_sc_0202A_15265.pdf",
    resource_type: "Dissertation",
    article_type: "Original Research",
    focus: ["Relationship Dynamics", "Attachment", "Emotional Regulation"]
  },
  {
    id: 6,
    title: "Attention-Deficit/Hyperactivity Disorder",
    authors: "Faraone SV, Asherson P, Banaschewski T, et al.",
    year: "2015",
    summary: "Comprehensive Lancet review covering ADHD across the lifespan, including impacts on adult relationships and family functioning.",
    full_summary: ``,
    link: "https://pubmed.ncbi.nlm.nih.gov/27189265/",
    resource_type: "Scientific Article",
    article_type: "Review",
    focus: ["ADHD Overview", "Lifespan", "Treatment"]
  },
  {
    id: 7,
    title: "The Prevalence of DSM-IV Attention-Deficit/Hyperactivity Disorder: A Meta-Analytic Review",
    authors: "Polanczyk G, de Lima MS, Horta BL, Biederman J, Rohde LA",
    year: "2007",
    summary: "Meta-analysis establishing worldwide ADHD prevalence rates, providing context for understanding how many couples are affected.",
    full_summary: ``,
    link: "https://pubmed.ncbi.nlm.nih.gov/22976615/",
    resource_type: "Scientific Article",
    article_type: "Meta-Analysis",
    focus: ["Epidemiology", "Prevalence", "Statistics"]
  },
  {
    id: 8,
    title: "The ADHD Effect on Marriage",
    authors: "Orlov M",
    year: "2010",
    summary: "The foundational book on ADHD in marriage, describing common patterns and providing the six-step approach to rebuilding relationships.",
    full_summary: ``,
    link: "https://www.adhdmarriage.com/content/adhd-effect-marriage",
    resource_type: "Book",
    article_type: "NA",
    focus: ["Relationship Dynamics", "Treatment", "Six Steps"]
  },
  {
    id: 9,
    title: "The Couple's Guide to Thriving with ADHD",
    authors: "Orlov M, Kohlenberger N",
    year: "2014",
    summary: "Practical guide offering specific strategies for couples affected by ADHD, including communication techniques and ways to rebuild intimacy.",
    full_summary: ``,
    link: "https://www.adhdmarriage.com/resources/books/couples-guide-thriving-adhd",
    resource_type: "Book",
    article_type: "NA",
    focus: ["Communication", "Intimacy", "Practical Strategies"]
  },
  {
    id: 10,
    title: "Driven to Distraction: Recognizing and Coping with Attention Deficit Disorder",
    authors: "Hallowell EM, Ratey JJ",
    year: "2011",
    summary: "Landmark book that helped bring adult ADHD into public awareness, including extensive discussion of relationship impacts.",
    full_summary: ``,
    link: "https://drhallowell.com/read/books-by-ned/",
    resource_type: "Book",
    article_type: "NA",
    focus: ["ADHD Overview", "Coping Strategies", "Awareness"]
  },
  {
    id: 11,
    title: "Taking Charge of Adult ADHD: Proven Strategies to Succeed at Work, at Home, and in Relationships",
    authors: "Barkley RA",
    year: "2021",
    summary: "Comprehensive guide by leading ADHD researcher with science-based strategies for managing ADHD in all life domains including relationships.",
    full_summary: ``,
    link: "https://www.guilford.com/books/Taking-Charge-of-Adult-ADHD/Russell-Barkley/9781462546855",
    resource_type: "Book",
    article_type: "NA",
    focus: ["Treatment", "Self-Management", "Practical Strategies"]
  },
  {
    id: 12,
    title: "You, Me & ADHD: ADHD Relationship Support",
    authors: "Pera G",
    year: "2024",
    summary: "Resources and blog series specifically for partners of adults with ADHD, providing validation and practical strategies.",
    full_summary: ``,
    link: "https://adhdrollercoaster.org/adhd-relationship-support/",
    resource_type: "Website",
    article_type: "NA",
    focus: ["Non-ADHD Partner Experience", "Support", "Practical Strategies"]
  },
  {
    id: 13,
    title: "ADHD and Relationships: How ADHD Impacts Dating, Marriage, and Emotional Dynamics",
    authors: "ADHD Online",
    year: "2024",
    summary: "Comprehensive overview of how ADHD affects romantic relationships from dating through marriage, with practical tips.",
    full_summary: ``,
    link: "https://adhdonline.com/articles/adhd-and-relationships-how-adhd-impacts-dating-marriage-and-emotional-dynamics/",
    resource_type: "Website",
    article_type: "NA",
    focus: ["Relationship Dynamics", "Dating", "Marriage"]
  },
  {
    id: 14,
    title: "7 Relationship Strategies for Non-ADHD Partners",
    authors: "ADDA",
    year: "2024",
    summary: "Practical strategies specifically for non-ADHD partners to improve relationship dynamics and reduce frustration.",
    full_summary: ``,
    link: "https://add.org/7-strategies-for-non-adhd-partners/",
    resource_type: "Website",
    article_type: "NA",
    focus: ["Non-ADHD Partner Experience", "Practical Strategies", "Communication"]
  },
  {
    id: 15,
    title: "How Does ADHD Affect Relationships and Marriage?",
    authors: "ADHD Aware UK",
    year: "2024",
    summary: "UK-based resource explaining ADHD's impact on relationships with culturally relevant perspectives and support options.",
    full_summary: ``,
    link: "https://adhdaware.org.uk/living-with-adhd/how-does-adhd-affect-relationships-and-marriage/",
    resource_type: "Website",
    article_type: "NA",
    focus: ["Relationship Dynamics", "UK Resources", "Support"]
  },
  {
    id: 16,
    title: "ADHD and Marriage: How to Handle Common Conflict Patterns",
    authors: "Focus on the Family",
    year: "2024",
    summary: "Faith-based perspective on managing ADHD-related conflict patterns in marriage with practical communication tips.",
    full_summary: ``,
    link: "https://www.focusonthefamily.com/marriage/adhd-and-marriage-how-to-handle-common-conflict-patterns/",
    resource_type: "Website",
    article_type: "NA",
    focus: ["Conflict Patterns", "Communication", "Faith-Based"]
  },
  {
    id: 17,
    title: "ADHD and Emotional Withdrawal: Why Women Pull Back",
    authors: "ADDitude Magazine",
    year: "2024",
    summary: "Explores emotional withdrawal patterns in women with ADHD and how rejection sensitivity affects relationships.",
    full_summary: ``,
    link: "https://www.additudemag.com/adhd-emotional-withdrawal-rejection-sensitivity-women/",
    resource_type: "Website",
    article_type: "NA",
    focus: ["Emotional Regulation", "Women with ADHD", "RSD"]
  },
  {
    id: 18,
    title: "ADHD and Relationships: Expert Marriage Advice",
    authors: "ADDitude Magazine",
    year: "2024",
    summary: "Expert advice on navigating ADHD in marriage, including common pitfalls and evidence-based solutions.",
    full_summary: ``,
    link: "https://www.additudemag.com/adhd-relationships-marriage-dating-conflict/",
    resource_type: "Website",
    article_type: "NA",
    focus: ["Marriage", "Expert Advice", "Practical Strategies"]
  },
  {
    id: 19,
    title: "ADHD and Relationships",
    authors: "Psychology Today",
    year: "2024",
    summary: "Overview of ADHD's impact on relationships from a psychological perspective, with links to therapist directories.",
    full_summary: ``,
    link: "https://www.psychologytoday.com/us/basics/adhd/adhd-and-relationships",
    resource_type: "Website",
    article_type: "NA",
    focus: ["Relationship Dynamics", "Psychology", "Finding Help"]
  },
  {
    id: 20,
    title: "The ADHD Effect on Marriage and Other Relationships",
    authors: "ADDitude Magazine",
    year: "2024",
    summary: "Comprehensive resource hub with articles, webinars, and expert advice for ADHD-affected relationships.",
    full_summary: ``,
    link: "https://www.additudemag.com/category/manage-adhd-life/relationships/",
    resource_type: "Website",
    article_type: "NA",
    focus: ["Resource Hub", "Multiple Topics", "Expert Advice"]
  },
  {
    id: 21,
    title: "How to Have Better Sex in ADHD Relationships",
    authors: "ADDitude Magazine",
    year: "2024",
    summary: "Addresses the often-overlooked topic of sexual intimacy in ADHD relationships with practical suggestions.",
    full_summary: ``,
    link: "https://www.additudemag.com/how-to-have-better-sex-adhd-relationships/",
    resource_type: "Website",
    article_type: "NA",
    focus: ["Intimacy", "Sexual Health", "Practical Strategies"]
  },
  {
    id: 22,
    title: "ADHD and Romantic Relationships: 10 Biggest Mistakes",
    authors: "ADDitude Magazine",
    year: "2024",
    summary: "Identifies common relationship mistakes made by couples affected by ADHD and how to avoid them.",
    full_summary: ``,
    link: "https://www.additudemag.com/adhd-and-romantic-relationships/",
    resource_type: "Website",
    article_type: "NA",
    focus: ["Common Mistakes", "Prevention", "Practical Strategies"]
  },
  {
    id: 23,
    title: "Understanding Parent-Child Dynamics in Couples with ADHD",
    authors: "ADHD Marriage",
    year: "2024",
    summary: "Deep dive into the destructive parent-child dynamic that often develops in ADHD marriages and how to escape it.",
    full_summary: ``,
    link: "https://www.adhdmarriage.com/content/understanding-parent-child-dynamics-couples-adhd",
    resource_type: "Website",
    article_type: "NA",
    focus: ["Parent-Child Dynamic", "Relationship Patterns", "Recovery"]
  },
  {
    id: 24,
    title: "Overly Sensitive to Criticism: Adult ADHD and RSD",
    authors: "ADDitude Magazine",
    year: "2024",
    summary: "Explains rejection sensitive dysphoria (RSD) and how it affects communication and conflict in relationships.",
    full_summary: ``,
    link: "https://www.additudemag.com/overly-sensitive-rsd/",
    resource_type: "Website",
    article_type: "NA",
    focus: ["RSD", "Emotional Regulation", "Communication"]
  },
  {
    id: 25,
    title: "ADHD Emotional Dysregulation in Relationships: Neurodivergent Love",
    authors: "ADDitude Magazine",
    year: "2024",
    summary: "Explores emotional dysregulation as a core ADHD feature and its impact on romantic relationships.",
    full_summary: ``,
    link: "https://www.additudemag.com/adhd-and-romantic-relationships-neurodivergent-love/",
    resource_type: "Website",
    article_type: "NA",
    focus: ["Emotional Regulation", "Neurodivergence", "Love"]
  },
  {
    id: 26,
    title: "Adult ADHD and Relationships",
    authors: "HelpGuide",
    year: "2024",
    summary: "Accessible guide for understanding ADHD's impact on relationships with practical tips for both partners.",
    full_summary: ``,
    link: "https://www.helpguide.org/mental-health/adhd/adult-adhd-and-relationships",
    resource_type: "Website",
    article_type: "NA",
    focus: ["Relationship Dynamics", "Both Partners", "Practical Tips"]
  },
  {
    id: 27,
    title: "Anger and Resentment: Key Issue in ADHD Marriages",
    authors: "ADHD Marriage",
    year: "2024",
    summary: "Addresses the buildup of anger and resentment in ADHD marriages and strategies for healing.",
    full_summary: ``,
    link: "https://www.adhdmarriage.com/content/anger-and-resentment-key-issue-adhd-marriages",
    resource_type: "Website",
    article_type: "NA",
    focus: ["Anger", "Resentment", "Healing"]
  },
  {
    id: 28,
    title: "9 Ways ADHD May Strain Relationships",
    authors: "ADDitude Magazine",
    year: "2024",
    summary: "Overview of common ways ADHD creates relationship strain with suggestions for each challenge.",
    full_summary: ``,
    link: "https://www.additudemag.com/adhd-divorce-rate-marriage-help/",
    resource_type: "Website",
    article_type: "NA",
    focus: ["Relationship Strain", "Common Challenges", "Solutions"]
  },
  {
    id: 29,
    title: "ADHD and Relationships: When Love Gets Lost in Translation",
    authors: "CHADD",
    year: "2024",
    summary: "CHADD's perspective on communication breakdowns in ADHD relationships and how to bridge the gap.",
    full_summary: ``,
    link: "https://chadd.org/attention-article/adhd-and-relationships-when-love-gets-lost-in-translation/",
    resource_type: "Website",
    article_type: "NA",
    focus: ["Communication", "Understanding", "Connection"]
  },
  {
    id: 30,
    title: "Marriage and Partnerships",
    authors: "CHADD",
    year: "2024",
    summary: "CHADD's comprehensive resource page on ADHD's impact on marriage and long-term partnerships.",
    full_summary: ``,
    link: "https://chadd.org/for-adults/marriage-and-partnerships/",
    resource_type: "Website",
    article_type: "NA",
    focus: ["Marriage", "Partnerships", "Resource Hub"]
  },
  {
    id: 31,
    title: "Revolutionizing ADHD Couple Therapy",
    authors: "Pera G",
    year: "2024",
    summary: "Discussion of new approaches to couples therapy that specifically address ADHD relationship dynamics.",
    full_summary: ``,
    link: "https://adhdrollercoaster.org/adhd-couple-therapy-the-revolution-is-on/",
    resource_type: "Website",
    article_type: "NA",
    focus: ["Couples Therapy", "Treatment Innovation", "Clinical Practice"]
  },
  {
    id: 32,
    title: "CHADD: Children and Adults with Attention-Deficit/Hyperactivity Disorder",
    authors: "CHADD Organization",
    year: "2024",
    summary: "Leading nonprofit providing education, advocacy, and support for individuals with ADHD and their families.",
    full_summary: ``,
    link: "https://chadd.org/",
    resource_type: "Organization",
    article_type: "NA",
    focus: ["Support", "Education", "Advocacy"]
  },
  {
    id: 33,
    title: "ADHD and Marriage",
    authors: "Orlov M",
    year: "2024",
    summary: "Dedicated website for couples affected by ADHD, featuring articles, courses, and community support.",
    full_summary: ``,
    link: "https://www.adhdmarriage.com/",
    resource_type: "Organization",
    article_type: "NA",
    focus: ["Couples Support", "Courses", "Community"]
  },
  {
    id: 34,
    title: "The Gottman Institute",
    authors: "Gottman JM, Gottman JS",
    year: "2024",
    summary: "Research-based approach to relationships that can be applied to ADHD-affected couples for building stronger connections.",
    full_summary: ``,
    link: "https://www.gottman.com/",
    resource_type: "Organization",
    article_type: "NA",
    focus: ["Relationship Science", "Communication", "Connection"]
  },
  {
    id: 35,
    title: "A.D.H.D. Can Strain Relationships",
    authors: "The New York Times",
    year: "2024",
    summary: "News coverage of research on ADHD's impact on relationships, bringing awareness to mainstream audiences.",
    full_summary: ``,
    link: "https://www.ncbi.nlm.nih.gov/search/research-news/15638",
    resource_type: "News Article",
    article_type: "NA",
    focus: ["Media Coverage", "Public Awareness", "Research Summary"]
  },
];

// Focus categories for filtering resources
export const focusCategories = ["All", "Relationship Dynamics", "Communication", "Treatment", "Emotional Regulation", "Non-ADHD Partner Experience", "Practical Strategies", "Intimacy", "Conflict Patterns", "Parent-Child Dynamic", "Support", "ADHD Overview"];

// Resource types for filtering
export const resourceTypes = ["All", "Scientific Article", "Book", "Website", "Dissertation", "News Article", "Organization"];

// Article types for filtering (for scientific articles)
export const articleTypes = ["All", "Original Research", "Review", "Meta-Analysis", "Case Study", "Commentary", "NA"];



// Categories for key takeaways filtering
export const takeawayCategories = ["All", "Understanding", "Patterns", "Strategy", "Treatment", "Communication", "Connection", "Relationships", "Steps", "Progress"];

// Categories for quiz filtering
export const quizCategories = ["All", "Understanding ADHD", "Statistics", "Relationship Patterns", "Treatment", "Strategy", "Communication", "Six Steps", "Non-ADHD Experience", "ADHD Experience", "Boundaries", "Connection", "Healing", "Critical Points", "Responsibility", "Progress", "Emotions"];
