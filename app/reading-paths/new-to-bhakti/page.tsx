'use client'

import Link from 'next/link'
import { startTransition, useEffect, useState } from 'react'

type Lesson = {
  week: number
  suggestedTitle: string
  chapters: { title: string; url: string }[]
  summary: string
  keyTakeaways: string[]
  vocabulary: { term: string; definition: string }[]
  reflectionQuestions: string[]
  quiz: { question: string; answer: string }[]
  moralValues: string[]
  suggestedCategory: string
  editorialWarnings: string[]
}

const bookTitle = 'The Science of Self-Realization'
const bookURL = 'https://vedabase.io/en/library/ssr/'

const lessons: Lesson[] = [
  {
    week: 1,
    suggestedTitle: 'The Self, Life’s Purpose, and a Guide for Learning',
    chapters: [
      { title: 'Introduction', url: `${bookURL}introduction/` },
      { title: 'Chapter 1: Learning the Science of the Soul', url: `${bookURL}1/` },
      { title: 'Chapter 2: Choosing a Spiritual Master', url: `${bookURL}2/` },
    ],
    summary: String.raw`# The Science of the Soul: Discovering Krishna and Finding a Genuine Spiritual Master

  ## Introduction: Who Are We Really?
  Have you ever looked in a mirror and wondered, “Who am I, really?” Am I just my body, my name, my family, or the clothes I wear? What happens to me when my body grows old? Why do people experience happiness and sadness? Is there a purpose to our lives beyond studying, earning money, and becoming successful?

  These are important questions that people have asked for thousands of years. According to the Vedic scriptures, including the Bhagavad-gita and Srimad-Bhagavatam, the answers begin with understanding the difference between our temporary body and our eternal self, the soul.

  The two teachings presented in these documents explain the science of the soul, our relationship with Krishna, the importance of devotional service, and the role of a genuine spiritual master. Together, they teach us how to understand our true identity and make our lives meaningful.

  ## 1. We Are Souls, Not Just Bodies
  Imagine that you are wearing your favorite shirt. If you change your shirt, do you become a different person? Of course not! Your shirt may change, but you remain the same person.

  The Vedic teachings explain that our body is like a shirt, while our real identity is the eternal soul within it.

  Our bodies change throughout our lives. We begin as babies, grow into children, become adults, and eventually grow old. Yet we continue to feel that we are the same person inside, even though our bodies look different.

  According to the Bhagavad-gita, the soul is eternal. It does not perish when the body dies. The body is temporary, but the soul continues its journey.

  Understanding this difference is the beginning of spiritual education. Schools teach us about mathematics, science, history, and language. These subjects are useful, but spiritual knowledge helps us answer an even deeper question: Who am I, and what is the purpose of my life?

  The Vedic scriptures teach that we are spiritual beings, not merely physical bodies. Our nationality, appearance, age, and possessions describe aspects of our temporary lives, but they do not describe our complete spiritual identity.

  Key point: You are an eternal soul living in a temporary body. Understanding this is the first step toward spiritual wisdom.

  ## 2. Krishna Is the Supreme Father of All Living Beings
  If we are souls, where do we come from? The Vedic teachings explain that Krishna, the Supreme Personality of Godhead, is the original source of all living beings.

  Just as children have a relationship with their parents, every living being has an eternal relationship with Krishna. We are described as His parts and parcels, which means that we belong to Him and share a spiritual connection with Him.

  Consider the human body. The hands, feet, eyes, and ears are different parts, but they all belong to the same body. When the different parts cooperate for the well-being of the whole body, the body functions properly.

  Similarly, the Vedic teachings explain that all living beings are connected to Krishna. We may look different, speak different languages, and live in different countries, but our spiritual connection with Him is shared.

  We naturally like to care for others. We serve our parents, help our friends, look after our pets, and contribute to our communities. The teachings explain that serving is a natural part of our nature.

  However, we may sometimes feel dissatisfied even after working hard to please others. The scriptures compare this situation to watering the leaves of a tree without watering its roots. The leaves may receive some water, but the tree will not flourish as well as it would if its roots were watered.

  In the same way, the teachings explain that serving Krishna, the original source of all living beings, helps us understand how to serve others in harmony with our spiritual nature.

  This does not mean that we should neglect our families or friends. Rather, devotional service teaches us to care for others while remembering our relationship with Krishna.

  Key point: Krishna is the Supreme Father, and all living beings are spiritually connected to Him.

  ## 3. What Is the Purpose of Human Life?
  People work hard to obtain food, comfortable homes, good education, money, and other necessities. These things can be important, but are they the only purpose of life?

  Think about a student who spends all day decorating a schoolbag but never uses it to carry books to school. The bag may look beautiful, but its main purpose is being forgotten.

  The first document uses a similar idea to explain human life. Our bodies are valuable because they provide us with an opportunity to learn, grow, understand spiritual knowledge, and develop our relationship with Krishna.

  Human life gives us the ability to ask questions, make thoughtful decisions, and seek answers about our existence.

  According to the Vedic teachings, the highest purpose of human life is to understand our spiritual identity and revive our loving relationship with Krishna.

  This does not mean we should stop studying, working, or helping our families. Instead, we can perform these activities responsibly while remembering that our lives have a spiritual purpose.

  We can study sincerely, speak truthfully, help someone who is struggling, care for animals, and use our talents to benefit others. When these activities are performed with devotion and a desire to please Krishna, they can become part of our spiritual journey.

  The scriptures also teach that material possessions and achievements cannot provide permanent happiness. A new toy may make us happy for a while, but eventually we may want another one. Our bodies also experience difficulties, such as illness and aging.

  Spiritual knowledge encourages us to look beyond temporary pleasures and discover a deeper form of happiness.

  Key point: Human life is a precious opportunity to develop spiritual knowledge, love Krishna, and serve others with devotion.

  ## 4. What Is Reincarnation?
  Have you ever wondered what happens after death?

  According to the Vedic scriptures, the soul does not cease to exist when the body dies. Instead, the soul continues its journey and receives another body according to the laws described in the scriptures. This process is called reincarnation.

  The Bhagavad-gita compares the soul's journey through different bodies to a person changing clothes. When old clothes are no longer useful, a person changes into new ones. Similarly, the body changes, but the soul continues to exist.

  The first document explains that the soul has passed through many changes of bodily existence and that human life offers a special opportunity for spiritual progress.

  Imagine receiving a ticket to visit a wonderful place. Would you spend the entire journey sleeping without ever looking outside? You would miss the opportunity to see what makes the journey special!

  In the same way, the Vedic teachings encourage us not to waste human life simply chasing temporary pleasures. We should use our time to develop wisdom and devotion.

  The ultimate spiritual goal described in these teachings is to return to Krishna's spiritual abode, where the soul can experience eternal spiritual life.

  Key point: According to the Vedic teachings, the soul is eternal, and human life provides an opportunity to make spiritual progress.

  ## 5. How Can We Awaken Our Love for Krishna?
  If our relationship with Krishna is eternal, why do we sometimes forget Him?

  The teachings explain that our original spiritual consciousness can become covered by material desires, distractions, and misunderstandings.

  Srila Prabhupada compares our consciousness to clear water. Water is naturally transparent, but mud can make it appear dirty. When the mud is removed, the water becomes clear again.

  Similarly, Krishna consciousness is described as our original spiritual consciousness, which can be awakened through the proper spiritual process.

  One important practice is chanting the Hare Krishna maha-mantra:

  Hare Krishna, Hare Krishna, Krishna Krishna, Hare Hare
  Hare Rama, Hare Rama, Rama Rama, Hare Hare

  The word Hare addresses the Lord's spiritual energy, while Krishna and Rama refer to the Supreme Lord. The mantra is a prayer asking Krishna to engage us in His service.

  Chanting helps us remember Krishna and turn our attention toward Him. It can be practiced at home, at a temple, individually, or with other devotees.

  Another important practice is hearing about Krishna through the Vedic scriptures and learning from people who sincerely follow their teachings.

  We can also develop Krishna consciousness through devotional activities, such as offering prayers, singing devotional songs, reading spiritual books, and helping others.

  For children, these practices can begin simply. You might chant for a few minutes each day, listen to a story about Krishna, or say a prayer before beginning an activity.

  The goal is not merely to repeat words mechanically. It is to develop a sincere desire to remember Krishna and strengthen our loving relationship with Him.

  Key point: Chanting Hare Krishna, hearing spiritual knowledge, and practicing devotional service help awaken our dormant love for Krishna.

  ## 6. What Does It Mean to Love God?
  What is the difference between doing something because we expect a reward and doing something because we genuinely love someone?

  Suppose you help a friend only because you expect a gift. If the gift never comes, you might stop helping. But if you help because you care about your friend, your kindness does not depend on receiving a reward.

  The second document explains that genuine devotion is based on love rather than personal profit.

  Similarly, we should not think of Krishna merely as someone who gives us everything we want. The teachings encourage us to develop a loving relationship with Him because He is the Supreme Lord and our eternal well-wisher.

  A child may love a parent not because the parent gives presents every day but because of the loving relationship they share. In a similar way, devotional service encourages us to serve Krishna with affection and sincerity.

  This love can influence how we treat everyone around us. We can become more patient with our siblings, more respectful toward our parents and teachers, and more compassionate toward animals.

  The Vedic teachings also encourage us to look beyond external differences. People may have different appearances, backgrounds, and abilities, but the spiritual perspective reminds us that all living beings deserve to be treated with care and respect.

  Key point: Real devotion means serving Krishna out of love, not simply asking Him for material rewards.

  ## 7. Who Is a Spiritual Master, or Guru?
  Learning something new is often easier when we have a good teacher.

  A mathematics teacher helps us understand numbers. A music teacher guides us as we learn an instrument. A science teacher helps us understand the world around us.

  Similarly, the Vedic scriptures explain that a genuine spiritual master, called a guru, guides students in understanding spiritual knowledge and their relationship with Krishna.

  The second document compares spiritual ignorance to darkness. Imagine walking through an unfamiliar room without any light. You might stumble over furniture because you cannot see where you are going.

  When someone turns on a light, you can see the room more clearly and understand where to go.

  A genuine spiritual master helps a sincere student move from spiritual ignorance toward spiritual understanding.

  The scriptures teach that spiritual knowledge should be learned from a qualified teacher who understands the Vedic teachings and follows the authentic tradition of spiritual teachers.

  A genuine guru does not invent a new message simply to become famous. According to these documents, the guru faithfully explains the teachings of Krishna and the previous spiritual masters.

  The guru's role is to help students understand spiritual life, practice devotion, and develop love for God.

  The documents also explain that a spiritual master is respected because he serves as a representative of Krishna. However, a genuine guru does not claim to be God Himself.

  Just as a messenger delivers a message from another person, the spiritual master transmits spiritual knowledge rather than replacing its original source.

  Key point: A genuine guru is a qualified spiritual teacher who guides students according to authentic spiritual teachings and helps them develop love for Krishna.

  ## 8. How Can We Recognize a Genuine Spiritual Master?
  Not everyone who claims to be a spiritual teacher is necessarily qualified to guide others. The second document warns that some people may use spiritual teachings to gain money, fame, or power.

  How, then, can we recognize a genuine spiritual master?

  First, a genuine guru teaches according to authentic scriptures rather than inventing teachings to attract followers. The guru respects the teachings of Krishna and the established tradition of spiritual knowledge.

  Second, a genuine guru is sincerely interested in spiritual life. The guru's purpose is to help people understand God and develop devotion, not simply to become wealthy or famous.

  Third, a genuine guru does not claim to be God or promise that people can become God through a quick trick. Instead, the guru teaches that we are eternal souls who can develop our relationship with Krishna through the proper spiritual process.

  Fourth, a genuine guru encourages sincere learning and spiritual practice. Just as becoming a doctor requires years of study and training, developing spiritual understanding requires seriousness, patience, and effort.

  Finally, the documents emphasize that students should examine a teacher carefully before accepting that person as their spiritual master. A spiritual relationship should not be established merely because a teacher is fashionable, impressive, or popular.

  The student should be willing to learn sincerely, ask appropriate questions, and follow sound spiritual guidance. The teacher should also be qualified to guide the student.

  Key point: Choose a spiritual teacher carefully. Look for genuine scriptural knowledge, sincere devotion, humility, and a commitment to guiding others toward Krishna.

  ## 9. How Should We Learn from a Spiritual Master?
  The Bhagavad-gita describes three important elements in approaching a spiritual teacher: humility, sincere questions, and service.

  Humility means recognizing that we do not know everything. Even intelligent students need teachers because there is always more to learn.

  Sincere questions help us understand difficult subjects. We should not be afraid to ask questions when we are confused. A good student asks respectfully because the goal is to understand the truth.

  Service means putting our learning into practice. If a teacher explains the importance of honesty, we should try to become more honest. If we learn that compassion is important, we should try to become kinder.

  Simply memorizing spiritual teachings is not enough. We should allow those teachings to improve our character and actions.

  For example, if we learn that all living beings are spiritually connected to Krishna, we can try to avoid hurting others unnecessarily. If we learn the importance of truthfulness, we can tell the truth even when doing so is difficult.

  A genuine spiritual teacher helps us apply spiritual knowledge to everyday life.

  Key point: Learn with humility, ask sincere questions, and put spiritual knowledge into practice through your actions.

  ## 10. Putting These Teachings into Practice
  Spiritual life does not have to begin with complicated activities. Children can begin with small, meaningful steps.

  Here are five ways to practice these teachings:

  1. Remember Krishna every day. Spend a few minutes chanting the Hare Krishna maha-mantra or offering a sincere prayer.
  2. Read spiritual stories. Learn about Krishna's activities and the teachings of the Bhagavad-gita and Srimad-Bhagavatam.
  3. Practice kindness. Help your parents, respect your teachers, care for animals, and be friendly toward others.
  4. Develop good habits. Try to be truthful, patient, responsible, and willing to learn from your mistakes.
  5. Seek authentic guidance. Learn from trustworthy, qualified spiritual teachers who explain the scriptures faithfully and encourage sincere devotional practice.

  These activities help us connect spiritual understanding with our everyday lives.

  We do not need to wait until we become adults to begin learning about the soul or developing devotion. Childhood is a wonderful time to cultivate good habits and build a strong foundation of spiritual knowledge.

  ## Conclusion: Discover Your True Identity
  The two documents share a central message: human life is a valuable opportunity to understand the eternal soul, revive our relationship with Krishna, and learn how to live with spiritual wisdom.

  The first document explains that we are not merely temporary bodies. We are eternal souls who have a relationship with Krishna, and we can awaken our original spiritual consciousness through chanting, hearing spiritual knowledge, and devotional service.

  The second document explains the importance of a genuine spiritual master who helps us understand these teachings. Such a teacher follows authentic scriptures, represents the teachings of Krishna, and guides students toward spiritual understanding rather than seeking personal fame or profit.

  Together, these teachings remind us that real success is not measured only by how much money we earn, how many possessions we own, or how famous we become. True success also involves developing wisdom, compassion, humility, and love for Krishna.

  Whenever you chant Hare Krishna, learn about the soul, help another person, or sincerely seek spiritual knowledge, you have an opportunity to make spiritual progress.

  Remember these three essential lessons:

  1. Know yourself: You are an eternal soul, not merely your temporary body.
  2. Know your relationship with Krishna: According to the Vedic teachings, Krishna is the Supreme Lord and the source of all living beings. Reviving your loving relationship with Him is the purpose of spiritual life.
  3. Learn from a genuine spiritual master: Seek authentic spiritual knowledge, ask sincere questions, and practice what you learn.

  By following these principles with sincerity and patience, we can gradually develop spiritual understanding and discover a deeper purpose in life.

  The journey begins with a simple but powerful question: “Who am I, and how can I revive my loving relationship with Krishna?”`,
    keyTakeaways: [
      'The book is an anthology; its introduction says readers may explore selections by topic.',
      'Chapter 1 argues that human life should include questions about identity and purpose, not only comfort and daily needs.',
      'Chapter 2 emphasizes careful selection of a teacher, sincere inquiry, and learning from an established teaching tradition.',
      'The examples and conclusions express the author’s Vedic and devotional viewpoint.',
    ],
    vocabulary: [
      { term: 'Self-realization', definition: 'The book’s term for learning about who you are beyond your changing body and roles.' },
      { term: 'Devotional service', definition: 'A practice of serving God with care and dedication, as described by the author.' },
      { term: 'Spiritual teacher', definition: 'A guide who teaches spiritual ideas; the chapter says learners should examine a teacher’s guidance carefully.' },
    ],
    reflectionQuestions: [
      'What is one big question about life that you would like to explore?',
      'How does the tree-root example help explain the author’s point about service?',
      'What are some safe ways to decide whether advice from a teacher or another adult is trustworthy?',
    ],
    quiz: [
      { question: 'What kind of book does the introduction describe?', answer: 'A collection of articles and other selections, including interviews, lectures, essays, and letters.' },
      { question: 'In the tree metaphor in Chapter 1, what does the author compare serving the root to?', answer: 'Serving the source is compared to watering a tree’s roots so the whole tree can benefit.' },
      { question: 'What three qualities of learning from a spiritual teacher are mentioned in Chapter 2?', answer: 'Approaching respectfully, asking sincere questions, and offering service.' },
      { question: 'According to Chapter 2, should a teacher claim to be God?', answer: 'No. The chapter says a genuine teacher represents and transmits the teaching rather than claiming to be God.' },
    ],
    moralValues: ['Curiosity about life’s purpose', 'Humility when learning', 'Careful judgment when choosing a guide'],
    suggestedCategory: 'Self-knowledge and learning',
    editorialWarnings: [
      'Draft for editorial approval only; not published.',
      'The summaries describe the author’s religious teachings and metaphors; they have not been independently fact-checked.',
      'Chapter 2 makes strong judgments about false teachers. Keep the children’s version focused on evaluating advice carefully and asking trusted adults for help.',
    ],
  },
  {
    week: 2,
    suggestedTitle: 'Different Traditions, Shared Questions',
    chapters: [
      { title: 'Chapter 3: Looking at the Cultural Background', url: `${bookURL}3/` },
      { title: 'Chapter 4: Understanding Kṛṣṇa and Christ', url: `${bookURL}4/` },
    ],
    summary: 'Chapter 3 looks at how the Bhagavad-gītā is understood within Indian spiritual culture. It includes a discussion of a commentary by the teacher Śaṅkara and a correspondence between Prabhupāda and a professor about how to interpret religious texts. Prabhupāda argues for understanding Krishna as a personal form of God and says that readers should consider the Gītā within its devotional tradition. The chapter includes strong criticism of interpretations the author disagrees with, so this lesson presents his position as one viewpoint rather than a neutral account of every tradition.\n\nChapter 4 is a conversation between Prabhupāda and a Christian monk. They talk about the names Christ, Christos, and Krishna, and about chanting, devotion, and following religious teachings. The speakers find a point of connection in devotion to God, while also disagreeing about what their scriptures mean and how they should be followed. Reading it as a dialogue helps children notice who is speaking and that people can discuss important differences without turning every disagreement into a fight. The lesson summarizes the exchange; it does not decide which theology is correct.',
    keyTakeaways: [
      'Chapter 3 includes both devotional writing and an exchange of differing views about the Bhagavad-gītā.',
      'Chapter 4 is a dialogue, so distinguish Prabhupāda’s claims from the other speaker’s responses.',
      'The conversation explores whether people from different traditions can direct devotion toward God.',
      'The source argues that readers should take religious teachings seriously and consider their context.',
    ],
    vocabulary: [
      { term: 'Dialogue', definition: 'A conversation in which people share ideas and respond to one another.' },
      { term: 'Interpretation', definition: 'An explanation of what a text, word, or teaching means.' },
      { term: 'Devotion', definition: 'Deep respect and dedication; here, devotion to God as described by the speakers.' },
    ],
    reflectionQuestions: [
      'What did the two speakers seem to agree about, and where did their views differ?',
      'Why is it useful to identify which person is making a claim in a conversation?',
      'How can you respectfully discuss a belief that is different from your own?',
    ],
    quiz: [
      { question: 'What format is used in Chapter 4?', answer: 'A conversation between Prabhupāda and a Christian monk.' },
      { question: 'Name one subject discussed in that conversation.', answer: 'Examples include names for God, chanting, devotion, or how to follow scripture.' },
      { question: 'Do the two speakers agree on every interpretation?', answer: 'No. The chapter presents points of agreement as well as different interpretations.' },
      { question: 'When summarizing a dialogue, whose claim should a reader identify?', answer: 'The reader should make clear which speaker expresses each claim.' },
    ],
    moralValues: ['Respectful dialogue', 'Listening across differences', 'Fairly representing another person’s view'],
    suggestedCategory: 'Interfaith dialogue and tradition',
    editorialWarnings: [
      'Draft for editorial approval only; not published.',
      'The source contains theological claims and disagreement about religious texts; present these as the speakers’ views.',
      'Chapter 3 discusses historical and cultural interpretations. Verify any specific historical claim independently before presenting it as fact.',
      'Chapter 4 includes adult debate about religious practice. Review wording and context for ages 8–15.',
    ],
  },
  {
    week: 3,
    suggestedTitle: 'Yoga, the Mind, and Questions About Society',
    chapters: [
      { title: 'Chapter 5: Practicing Yoga in the Age of Quarrel', url: `${bookURL}5/` },
      { title: 'Chapter 6: Finding the Cure for Today’s Social Ills', url: `${bookURL}6/` },
    ],
    summary: 'Chapter 5 explains that the word yoga can mean more than stretches or exercise. In the author’s view, yoga is a way to train attention and bring the mind toward spiritual understanding. He discusses the difference between an individual’s awareness and the Supersoul, which he describes as present everywhere, and argues that devotional practice can connect a person’s focus with God. The chapter recommends chanting as a practice for the current age. These descriptions express the book’s religious teachings, not independently verified scientific conclusions.\n\nChapter 6 gathers interviews and conversations about problems in society, including crime, welfare, leadership, and science. A recurring argument is that changing rules alone may not address the motives behind harmful actions; the author emphasizes education, values, and spiritual understanding. He also makes broad and sometimes sharply worded claims about governments, social groups, and scientific ideas. Those claims need careful context and fact-checking before children encounter them. This overview describes the chapter’s themes without treating its political or scientific arguments as settled facts.',
    keyTakeaways: [
      'Chapter 5 presents yoga as a spiritual discipline involving the mind and senses, not only body postures.',
      'The author recommends devotional chanting as a practical form of yoga for the current age; this is his religious view.',
      'Chapter 6 applies the author’s spiritual framework to social questions such as crime and welfare.',
      'The chapter’s claims about social causes and scientific debates require careful editorial framing.',
    ],
    vocabulary: [
      { term: 'Yoga', definition: 'In this book, a spiritual practice for directing attention and connecting with the Supreme; other traditions may define yoga differently.' },
      { term: 'Supersoul', definition: 'The author’s term for God’s presence within all living beings.' },
      { term: 'Saṅkīrtana', definition: 'Congregational chanting or singing of sacred names, as described in the book.' },
    ],
    reflectionQuestions: [
      'How is the book’s meaning of yoga different from exercise alone?',
      'What kinds of causes for social problems does Chapter 6 discuss?',
      'When a speaker makes a strong claim about society or science, what questions could an editor ask before presenting it to children?',
    ],
    quiz: [
      { question: 'How does Chapter 5 describe yoga beyond physical postures?', answer: 'As a spiritual practice involving focus, the mind, and a relationship with the Supreme, according to the author.' },
      { question: 'What practice does the author recommend in Chapter 5?', answer: 'Devotional chanting, presented as the author’s recommendation.' },
      { question: 'What kinds of topics appear in Chapter 6?', answer: 'Interviews discuss topics such as crime, social organization, government, science, and welfare.' },
      { question: 'Should Chapter 6’s social explanations be presented as verified facts?', answer: 'No. They should be attributed to the author and independently reviewed if presented as factual claims.' },
    ],
    moralValues: ['Self-discipline', 'Compassion for people facing difficulties', 'Thinking critically about social claims'],
    suggestedCategory: 'Yoga, society, and values',
    editorialWarnings: [
      'Draft for editorial approval only; not published.',
      'Chapter 5 describes a specific devotional understanding of yoga; do not present it as the only neutral or universally accepted definition.',
      'Chapter 6 contains broad and sometimes polemical claims about crime, politics, science, and social groups. An editor should check context, accuracy, and age suitability.',
      'No claims in this summary have been independently fact-checked.',
    ],
  },
  {
    week: 4,
    suggestedTitle: 'A Journey Toward Self-Understanding and Love',
    chapters: [
      { title: 'Chapter 7: Returning to the Eternal Religion', url: `${bookURL}7/` },
      { title: 'Chapter 8: Reaching Life’s Perfection', url: `${bookURL}8/` },
    ],
    summary: 'Chapter 7 opens with a prayer the author wrote while arriving in America. The prayer describes his uncertainty about the task ahead and asks for help sharing his spiritual message. Other selections discuss compassion, religious identity, and what it means to help people. They show the author’s belief that spiritual teaching should lead people toward care and understanding. Some selections also contain strong statements about society and religion, which should be read with their historical and conversational context.\n\nChapter 8 focuses on the question “Who am I?” The author uses the image of a dusty mirror: if the mirror is cleaned, a person can see a reflection more clearly. He compares this with clearing confusion about identity. The chapter presents the author’s view that people are more than their bodies and that human life can be used to understand a relationship with God. It describes love and service to God as the highest spiritual goal. These are the author’s religious teachings, not independently verified facts. A useful discussion point for children is how the chapter’s idea of love-as-service connects with everyday kindness, while recognizing that the book gives it a specifically devotional meaning.',
    keyTakeaways: [
      'Chapter 7 includes a personal prayer and later discussions about compassion and spiritual purpose.',
      'Chapter 8 uses the mirror image to explain the author’s idea of clearing confusion about the self.',
      'The author presents loving service to God as the goal of spiritual practice.',
      'The chapters invite readers to reflect on identity, purpose, and how people treat one another.',
    ],
    vocabulary: [
      { term: 'Compassion', definition: 'Noticing another person’s difficulty and wanting to help.' },
      { term: 'Identity', definition: 'A person’s understanding of who they are.' },
      { term: 'Devotional service', definition: 'Loving service to God, which the author presents as a spiritual goal.' },
    ],
    reflectionQuestions: [
      'What might the dusty-mirror image help a reader think about?',
      'How can compassion show up in an ordinary day at school or at home?',
      'How does Chapter 8 connect love with service? What parts are the author’s religious viewpoint?',
    ],
    quiz: [
      { question: 'What kind of text opens Chapter 7?', answer: 'A prayer written by the author while arriving in America.' },
      { question: 'What does the mirror image represent in Chapter 8?', answer: 'The author uses it to describe clearing confusion that obscures self-understanding.' },
      { question: 'What does the author present as the goal of spiritual practice?', answer: 'Love and devotional service to God, according to the chapter.' },
      { question: 'Are these spiritual teachings presented as independently verified facts?', answer: 'No. They are clearly identified as the author’s religious teachings.' },
    ],
    moralValues: ['Compassion', 'Purposeful reflection', 'Love expressed through service'],
    suggestedCategory: 'Purpose and devotional life',
    editorialWarnings: [
      'Draft for editorial approval only; not published.',
      'Chapters 7 and 8 contain religious doctrine and claims about identity, society, and spiritual life; attribute them to the author.',
      'Some passages use strong comparisons and assumptions about other viewpoints. Keep the children’s summary neutral and review it for respectful, age-appropriate wording.',
      'This draft has not been independently fact-checked.',
    ],
  },
]

const storageKey = 'bluishboy-new-to-bhakti-ssr-progress-v1'

function renderSummary(summary: string) {
  const blocks: string[] = []

  for (const block of summary.trim().split(/\n\s*\n+/)) {
    const previous = blocks[blocks.length - 1]
    if (/^\d+\.\s/.test(block) && previous && previous.split('\n').every((line) => /^\d+\.\s/.test(line))) {
      blocks[blocks.length - 1] = `${previous}\n${block}`
    } else {
      blocks.push(block)
    }
  }

  return blocks.map((block, index) => {
    const lines = block.split('\n')
    if (block.startsWith('# ')) return <h3 key={index}>{block.slice(2)}</h3>
    if (block.startsWith('## ')) return <h4 key={index}>{block.slice(3)}</h4>
    if (lines.every((line) => /^\d+\.\s/.test(line))) {
      return <ol key={index}>{lines.map((line) => <li key={line}>{line.replace(/^\d+\.\s/, '')}</li>)}</ol>
    }
    if (block.startsWith('Key point:')) {
      return <p key={index}><strong>Key point:</strong>{block.slice('Key point:'.length)}</p>
    }
    return <p key={index}>{block.replace(/\n/g, ' ')}</p>
  })
}

export default function NewToBhaktiPage() {
  const [activeLesson, setActiveLesson] = useState(0)
  const [completed, setCompleted] = useState<boolean[]>([])

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) startTransition(() => setCompleted(parsed.map(Boolean).slice(0, lessons.length)))
      }
    } catch {
      // Keep the path usable if browser storage is unavailable or malformed.
    }
  }, [])

  function setLessonComplete(index: number, isComplete: boolean) {
    setCompleted((current) => {
      const next = lessons.map((_, lessonIndex) => lessonIndex === index ? isComplete : Boolean(current[lessonIndex]))
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(next))
      } catch {
        // Completion remains available for this visit if storage is unavailable.
      }
      return next
    })
  }

  function resetProgress() {
    if (!window.confirm('Reset New to Bhakti progress and return to Week 1?')) return
    try {
      window.localStorage.removeItem(storageKey)
    } catch {
      // Reset in-memory progress even when browser storage is unavailable.
    }
    setCompleted([])
    setActiveLesson(0)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const lesson = lessons[activeLesson]
  const completeCount = completed.filter(Boolean).length

  return (
    <div className="reading-paths">
      <div className="rp-announcement">
        <div className="rp-announcement-inner nbp-announcement-inner">
          <Link href="/reading-paths" className="rp-home-link nbp-back-link">← Reading Paths</Link>
          <span className="nbp-announcement-title">Your Journey Back to Krishna Begins Here</span>
          <Link href="/" className="rp-home-link nbp-home-link">Home</Link>
        </div>
      </div>

      <main>
        <section className="rp-section nbp-intro">
          <div className="rp-container">
            <p className="rp-kicker">Beginner · 4 weeks · 1 book</p>
            <h1>New to Bhakti</h1>
            <p className="nbp-lead">Four weekly reading drafts from <em>{bookTitle}</em>. Each lesson is for editorial review and has not been published.</p>
            <div className="nbp-progress-row">
              <div className="nbp-progress-summary" aria-live="polite">
                <span>{completeCount} of {lessons.length} weeks complete</span>
                <progress max={lessons.length} value={completeCount} aria-label="New to Bhakti progress" />
              </div>
              <button className="nbp-reset" type="button" onClick={resetProgress} disabled={completeCount === 0 && activeLesson === 0}>
                Reset progress
              </button>
            </div>
          </div>
        </section>

        <section className="rp-section nbp-course" aria-label="Guided course">
          <div className="rp-container nbp-course-layout">
            <nav className="nbp-topic-nav" aria-label="Course topics">
              <p className="rp-kicker">Your learning path</p>
              <ol>
                {lessons.map((item, index) => (
                  <li key={item.week}>
                    <button
                      className={`nbp-topic${activeLesson === index ? ' is-active' : ''}`}
                      type="button"
                      aria-current={activeLesson === index ? 'step' : undefined}
                      onClick={() => setActiveLesson(index)}
                    >
                      <span className="nbp-topic-index">{completed[index] ? '✓' : String(item.week).padStart(2, '0')}</span>
                      <span>
                        <span className="nbp-topic-weeks">Week {item.week}</span>
                        <span className="nbp-topic-title">{item.suggestedTitle}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </nav>

            <article className="nbp-lesson" aria-live="polite">
              <div className="nbp-draft-banner" role="note">Editorial draft · Not published · Requires approval</div>
              <p className="rp-kicker">Week {lesson.week} of {lessons.length}</p>
              <h2>{lesson.suggestedTitle}</h2>
              <p className="nbp-book-name">{bookTitle}</p>

              <section className="nbp-reading-block">
                <h3>Assigned reading</h3>
                <ul className="nbp-chapter-list">
                  {lesson.chapters.map((chapter) => (
                    <li key={chapter.url}><a href={chapter.url} target="_blank" rel="noreferrer">{chapter.title}</a></li>
                  ))}
                </ul>
              </section>

              <section className="nbp-reading-block">
                <h3>Summary</h3>
                <div className="nbp-summary-content">{renderSummary(lesson.summary)}</div>
              </section>

              <section className="nbp-reading-block">
                <h3>Key takeaways</h3>
                <ul className="nbp-editorial-list">
                  {lesson.keyTakeaways.map((takeaway) => <li key={takeaway}>{takeaway}</li>)}
                </ul>
              </section>

              <section className="nbp-reading-block">
                <h3>Vocabulary</h3>
                <dl className="nbp-vocabulary-list">
                  {lesson.vocabulary.map((entry) => (
                    <div key={entry.term}>
                      <dt>{entry.term}</dt>
                      <dd>{entry.definition}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section className="nbp-reading-block">
                <h3>Pause and reflect</h3>
                <ol className="nbp-editorial-list">
                  {lesson.reflectionQuestions.map((question) => <li key={question}>{question}</li>)}
                </ol>
              </section>

              <section className="nbp-reading-block">
                <h3>Quiz</h3>
                <ol className="nbp-quiz-list">
                  {lesson.quiz.map((item) => (
                    <li key={item.question}>
                      <p>{item.question}</p>
                      <details><summary>Show answer</summary><p>{item.answer}</p></details>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="nbp-reading-block">
                <h3>Moral values derived</h3>
                <ul className="nbp-value-list">
                  {lesson.moralValues.map((value) => <li key={value}>{value}</li>)}
                </ul>
              </section>

              <section className="nbp-reading-block nbp-source">
                <h3>Source metadata</h3>
                <p><strong>Book:</strong> {bookTitle}</p>
                <p><strong>Author named in source:</strong> A. C. Bhaktivedanta Swami Prabhupāda</p>
                <p><strong>Website:</strong> Bhaktivedanta Vedabase</p>
                <p><strong>Suggested category:</strong> {lesson.suggestedCategory}</p>
                <p><strong>Source URL:</strong> <a href={bookURL} target="_blank" rel="noreferrer">{bookURL}</a></p>
              </section>

              <section className="nbp-warning" aria-labelledby="editorial-warnings-title">
                <h3 id="editorial-warnings-title">Editorial warnings</h3>
                <ul>{lesson.editorialWarnings.map((warning) => <li key={warning}>{warning}</li>)}</ul>
              </section>

              <label className="nbp-complete">
                <input
                  type="checkbox"
                  checked={Boolean(completed[activeLesson])}
                  onChange={(event) => setLessonComplete(activeLesson, event.target.checked)}
                />
                <span>Mark this topic complete</span>
              </label>

              <div className="nbp-navigation">
                <button
                  className="rp-button rp-button-secondary"
                  type="button"
                  disabled={activeLesson === 0}
                  onClick={() => setActiveLesson((current) => Math.max(0, current - 1))}
                >
                  <span aria-hidden="true">←</span> Previous topic
                </button>
                {activeLesson < lessons.length - 1 ? (
                  <button
                    className="rp-button"
                    type="button"
                    onClick={() => setActiveLesson((current) => Math.min(lessons.length - 1, current + 1))}
                  >
                    Next week <span aria-hidden="true">→</span>
                  </button>
                ) : (
                  <Link className="rp-button" href="/reading-paths#training-plans">
                    Return to all plans <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            </article>
          </div>
        </section>
      </main>

      <footer className="rp-footer">
        <div className="rp-container">
          <p>© 2026 Bluish Boy. All rights reserved.</p>
          <p>Wisdom for the journey.</p>
        </div>
      </footer>
    </div>
  )
}
