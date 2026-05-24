import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  Image, Animated, Platform, StatusBar, Easing,
  TextInput, KeyboardAvoidingView, useWindowDimensions,
} from 'react-native';
import { Colors, Typography, Radius, Spacing } from '../theme';
import { saveGeneratedStory } from '../navigation/AppNavigator';

// ─── Mock story generator ──────────────────────────────────────────────────
const MOCK_STORIES: Record<string, { title: string; body: string; image: string; images: string[] }> = {
  'Dark Fantasy': {
    title: 'The Ashen Crown',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
      'https://images.unsplash.com/photo-1440778303588-435521a205bc?w=800&q=80',
      'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=800&q=80',
    ],
    body: `The crown was forged from the bones of the last true king — everyone knew this, and yet no one dared say it aloud.

She found it in a vault beneath the ruins of Duskhold, buried under seventeen years of ash and silence. The moment her fingers closed around the blackened metal, she felt the weight of every soul it had consumed: a cold, familiar hunger that pressed against the back of her skull like a second mind.

Outside, the Pale Company waited. They had followed her across three kingdoms and a war, trusting her maps and her lies in equal measure. They did not know what she had come here to find. They did not know what it would cost.

She stood in the dark for a long time, the crown's hollow eye sockets watching her.

Then she put it on.

The world shifted — colour bled from the air, replaced by the stark arithmetic of power. She could see the threads of every life within a mile. She could feel their fear like warmth on her skin.

She had always told herself she would resist it.

She had always been a very good liar.`,
  },
  'Mythology': {
    title: 'The God Who Forgot His Name',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',
      'https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=80',
      'https://images.unsplash.com/photo-1471874708734-a6d78e2b3647?w=800&q=80',
    ],
    body: `In the age before rivers had names, there was a god who collected silences.

He walked between the mortal villages at dusk, gathering the quiet that fell between one breath and the next — the pause before a mother calls her child home, the held note after a bell is struck, the moment a flame decides whether to die.

For ten thousand years he worked, until his pockets were so full of silence that he forgot what sound had ever meant.

The villagers stopped leaving offerings at his temple. They built new shrines to louder gods — gods of thunder, gods of war, gods who announced themselves with fanfare and fire.

He didn't mind. Or he had forgotten how to mind.

Then a girl came to his empty temple on a morning that smelled like rain. She was seven years old and she was angry, which is the loudest thing a child can be. She sat in the dust and shouted his name — a name no one had spoken in four hundred years — until her voice broke and the walls trembled and every silence he had ever collected shattered like glass.

He remembered everything at once.

It was, he later decided, the finest gift he had ever received.`,
  },
  'Sci-Fi': {
    title: 'Signal from Meridian-7',
    image: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=800&q=80',
      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80',
      'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&q=80',
    ],
    body: `The signal arrived at 0347 station-time, three weeks after everyone aboard the Meridian-7 had agreed there was nothing left to find.

It was not a distress call. It was not a beacon. The analyst who caught it in the background noise of a routine survey said it sounded, improbably, like a question.

Dr. Caen spent six hours running decryption algorithms before she accepted that the signal required no decryption — it was simply a language no one had built a translation matrix for. She spent another hour accepting that she understood it anyway, in the same wordless way you understand you are being watched.

The question it asked was this: Are you the ones who will listen?

She composed her response with great care. She had learned, over a career spent at the edge of known space, that first impressions between species were irreversible.

She typed: We are trying to be.

For eleven minutes there was silence across every frequency.

Then the stars ahead of them rearranged themselves into a pattern that matched no charted constellation — and the Meridian-7's navigation system quietly recalculated their destination.`,
  },
  'Noir': {
    title: 'Raining in Intervals',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
      'https://images.unsplash.com/photo-1514539079130-25950c84af65?w=800&q=80',
    ],
    body: `The city rained in intervals, like it was billing by the hour.

Mara Voss came to my office at half-past nine with an envelope and a story that had too many straight lines. In my experience, real trouble comes in curves — it bends around the parts people don't want you to see.

She said her husband was missing. She said she'd found his coat in the canal district, twelve blocks from any reason he'd have to be there. She said she wasn't worried, the way people say they're not worried when worry has already moved into their chest and put up shelves.

I took the envelope. I told her the standard rate. I didn't tell her that I'd seen her husband three days ago, coming out of a building on Vecker Street that operated as a tailor shop on paper and something considerably less reputable in practice.

I didn't tell her because she already knew.

People hire detectives for two reasons: to find the truth, and to be found looking for it. Mara Voss, I decided, was in the market for the second one.

I didn't judge her. We all need a good alibi for our own silence.`,
  },
  'Historical': {
    title: 'The Last Cartographer',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80',
      'https://images.unsplash.com/photo-1564502174567-e74e41bde5a4?w=800&q=80',
      'https://images.unsplash.com/photo-1548610762-b6e89b1a0ec2?w=800&q=80',
    ],
    body: `The empire sent cartographers ahead of its armies. This was, the generals argued, more civilised than sending armies ahead of cartographers.

Fen Orsa had drawn the edges of four continents and two wars. She had learned to make her maps beautiful because emperors did not hang ugly maps in their throne rooms, and throne rooms were where wars were decided.

In the mountains of the northern province, she found a village that was not on any map — not because no one had been there, but because every cartographer who reached it had drawn a different version. The village shifted, the elders told her without embarrassment, depending on what the traveller needed to find.

She spent three weeks documenting the phenomenon with the rigorous neutrality her training demanded. She measured distances and recorded elevations and interviewed forty-seven residents whose accounts were consistent only in their inconsistency.

She filed her report. She omitted the village entirely.

Some places, she had decided, were more useful to the world as rumour than as territory. The empire had enough things it already owned.`,
  },
  'Romance': {
    title: 'The Language of Margins',
    image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&q=80',
      'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800&q=80',
      'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80',
    ],
    body: `She had bought the book secondhand, and it arrived with someone else's entire interior life scrawled in the margins.

The handwriting was angular and impatient — the handwriting, she thought, of someone who read like they were in an argument. Every sentence was underlined or contested or followed by a small, exasperated question mark. The book was about loss, and the margin writer had clearly been losing something specific while they read it.

She added her own notes in a different colour, responding to their responses. She had no one to send them to, but the habit of dialogue is hard to break.

Four months later, she returned the book to the same secondhand shop — a small act of continuation, releasing it back into the current.

The man at the counter looked at the margins and smiled.

She asked him why.

He said: My handwriting.

They stood in the particular silence of two people realising that fate, if it exists, has a very literary sense of humour.

She asked if he'd like to get coffee and continue the argument in person.

He said he'd been hoping someone would ask.`,
  },
  'Horror': {
    title: 'What the House Remembers',
    image: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80',
      'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=800&q=80',
      'https://images.unsplash.com/photo-1527161153332-99adcc6f2966?w=800&q=80',
    ],
    body: `The house had been empty for eleven years, and it had spent every one of those years waiting.

The estate agent called it "full of character," which was the industry term for something the seller would rather not explain. The price was low in the way that things are low when no one else will take them.

The first night, Elara noticed the sounds — not the settling of old wood or the sigh of pipes, but something more deliberate. Footsteps that paused outside doors. A faint, rhythmic knocking with no discernible source. Drawers that opened by themselves to reveal exactly what she'd been looking for.

The house was helpful. That was what frightened her.

She found the journal in the second week, behind a baseboard that had come loose as if presenting itself. It belonged to the last resident, and it documented, in increasingly erratic handwriting, the same progression: gratitude, unease, dread.

The final entry was a single line.

It wants to be needed more than it wants anything else.

Elara closed the journal and sat for a long time in the helpful silence of the house, listening to it listen to her.

Then she called a locksmith, which felt like the most useful form of bravery she had available.`,
  },
  'Thriller': {
    title: 'The Third Signature',
    image: 'https://images.unsplash.com/photo-1531685250784-7569952593d2?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1531685250784-7569952593d2?w=800&q=80',
      'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&q=80',
      'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=800&q=80',
    ],
    body: `The document required three signatures, and two of the people who needed to sign it were dead.

Investigator Solen Marsh laid the papers on her desk and worked through the arithmetic of this calmly, the way she'd been trained. Coincidence required approximately three coincidences before it ceased to be coincidence and became a pattern. She was looking at two suspicious deaths and a contract that would transfer controlling interest in a resource network worth eleven figures.

The third signatory was a retired magistrate living under a name that didn't appear in any public record. She had an address — a PO box in a mid-sized city — and a reputation for being very difficult to find.

She also, Solen had just discovered, had a daughter. The daughter lived under her own name, which was either a gesture of defiance or an invitation.

Solen's phone rang. The caller ID showed a number she didn't recognise.

She answered.

A voice said: You're looking in the right direction. Stop looking.

The line went dead.

Solen set down the phone and picked up her coat. In her experience, people who called to say stop were never actually asking you to stop — they were confirming that you were close enough to frighten them.

She found that very encouraging.`,
  },
};

const getFallbackStory = (genre: string) =>
  MOCK_STORIES[genre] ?? MOCK_STORIES['Dark Fantasy'];

// ─── Generating animation ──────────────────────────────────────────────────
const GENERATING_LINES = [
  'Weaving your narrative threads...',
  'Shaping the world around your choices...',
  'Breathing life into your protagonist...',
  'Polishing the final words...',
];

function GeneratingView({ onDone }: { onDone: () => void }) {
  const [lineIdx, setLineIdx] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;
  const pulse    = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1, duration: 2800, easing: Easing.out(Easing.quad), useNativeDriver: false,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1,   duration: 700, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.4, duration: 700, useNativeDriver: true }),
      ])
    ).start();

    const lineTimer = setInterval(() =>
      setLineIdx(i => (i + 1) % GENERATING_LINES.length), 900);
    const doneTimer = setTimeout(onDone, 3000);

    return () => { clearInterval(lineTimer); clearTimeout(doneTimer); };
  }, []);

  const barWidth = progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });

  return (
    <View style={gs.wrap}>
      <Animated.Text style={[gs.icon, { opacity: pulse }]}>✦</Animated.Text>
      <Text style={gs.title}>CRAFTING YOUR STORY</Text>
      <Text style={gs.hint}>{GENERATING_LINES[lineIdx]}</Text>
      <View style={gs.barTrack}>
        <Animated.View style={[gs.barFill, { width: barWidth }]} />
      </View>
    </View>
  );
}
const gs = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, paddingBottom: 80 },
  icon: { fontSize: 48, color: Colors.gold },
  title: { fontSize: Typography.sizes.sm, color: Colors.text, letterSpacing: 4, fontWeight: '700' },
  hint: { fontSize: Typography.sizes.xs, color: Colors.textMuted, letterSpacing: 1.5, fontStyle: 'italic' },
  barTrack: {
    width: '70%', height: 2, borderRadius: 1,
    backgroundColor: Colors.border, marginTop: 8, overflow: 'hidden',
  },
  barFill: { height: '100%', backgroundColor: Colors.gold, borderRadius: 1 },
});

// ─── Regenerate suggestions ────────────────────────────────────────────────
const REGEN_SUGGESTIONS = [
  'More suspense', 'Change the ending', 'Add a twist', 'Make it shorter',
  'Darker tone', 'New protagonist',
];

// ─── Main Screen ───────────────────────────────────────────────────────────
export default function StoryResultScreen({ navigation, route }: any) {
  const { genre, format, length, tone, protagonist } = route.params ?? {};
  const { width: SCREEN_W } = useWindowDimensions();

  const [phase,              setPhase]              = useState<'generating' | 'result'>('generating');
  const [saved,              setSaved]              = useState(false);
  const [editedTitle,        setEditedTitle]        = useState('');
  const [editedBody,         setEditedBody]         = useState('');
  const [carouselIdx,        setCarouselIdx]        = useState(0);
  const [regenInput,         setRegenInput]         = useState('');
  const [videoPromptVisible, setVideoPromptVisible] = useState(true);

  const story   = getFallbackStory(genre);
  const isWatch = format === 'watch';
  const images  = story.images ?? [story.image];

  // Pre-fill editable fields as soon as story is ready
  useEffect(() => {
    if (phase === 'result') {
      setEditedTitle(story.title);
      setEditedBody(story.body);
      setCarouselIdx(0);
    }
  }, [phase]);

  // True once user has changed either field from the original
  const hasEdited =
    (editedTitle !== '' && editedTitle !== story.title) ||
    (editedBody  !== '' && editedBody  !== story.body);

  const handleSave = () => {
    if (saved) return;
    saveGeneratedStory(
      {
        title: editedTitle || story.title,
        category: genre?.toUpperCase() ?? 'STORY',
        desc: (editedBody || story.body).slice(0, 100) + '...',
        image: story.image,
      },
      isWatch ? 'video' : 'storybook',
    );
    setSaved(true);
  };

  const handleRegenerate = (hint?: string) => {
    setPhase('generating');
    setSaved(false);
    setEditedTitle('');
    setEditedBody('');
    setRegenInput('');
  };

  const handleGoHome = () => navigation.navigate('Home');

  return (
    <KeyboardAvoidingView
      style={rs.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" />

      {/* ── Header ─────────────────────────────────────────── */}
      <View style={rs.header as any}>
        <TouchableOpacity style={rs.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Text style={rs.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={rs.headerTitle}>
          {phase === 'generating' ? 'GENERATING...' : 'YOUR STORY'}
        </Text>
        <TouchableOpacity style={rs.backBtn} onPress={handleGoHome} activeOpacity={0.7}>
          <Text style={rs.homeIcon}>⌂</Text>
        </TouchableOpacity>
      </View>

      {phase === 'generating' ? (
        <GeneratingView onDone={() => setPhase('result')} />
      ) : (
        <>
          {/* ── Scrollable content ─────────────────────────── */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={rs.scroll}
            keyboardShouldPersistTaps="handled"
          >
            {/* ── Carousel header ──────────────────────────── */}
            <View style={[rs.carouselWrap, { width: SCREEN_W }]}>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onMomentumScrollEnd={(e) => {
                  const idx = Math.round(e.nativeEvent.contentOffset.x / SCREEN_W);
                  setCarouselIdx(idx);
                }}
                style={{ width: SCREEN_W, height: 300 }}
              >
                {images.map((img, i) => (
                  <View key={i} style={[rs.slide, { width: SCREEN_W }]}>
                    <Image source={{ uri: img }} style={rs.cover} resizeMode="cover" />
                    <View style={rs.coverGrad} />
                  </View>
                ))}
              </ScrollView>

              {/* Tags — top-left */}
              <View style={rs.tagRow}>
                <View style={[rs.tag, isWatch && rs.tagWatch]}>
                  <Text style={rs.tagText}>{isWatch ? '▶  WATCH' : '◎  READ'}</Text>
                </View>
                {length && <View style={rs.tag}><Text style={rs.tagText}>{length.toUpperCase()}</Text></View>}
                {tone   && <View style={rs.tag}><Text style={rs.tagText}>{tone.toUpperCase()}</Text></View>}
              </View>

              {/* Genre — bottom-left */}
              {genre && (
                <View style={rs.coverGenreWrap}>
                  <Text style={rs.coverGenre}>{genre.toUpperCase()}</Text>
                  {protagonist ? <Text style={rs.coverProt}>feat. {protagonist}</Text> : null}
                </View>
              )}

              {/* Dot indicators — bottom-center */}
              {images.length > 1 && (
                <View style={rs.dotsRow}>
                  {images.map((_, i) => (
                    <View key={i} style={[rs.dot, i === carouselIdx && rs.dotActive]} />
                  ))}
                </View>
              )}
            </View>

            {/* ── Inline editable title ─────────────────────── */}
            <View style={rs.titleFieldWrap}>
              <TextInput
                style={rs.titleField as any}
                value={editedTitle}
                onChangeText={t => { setEditedTitle(t); setSaved(false); }}
                placeholder="Story title..."
                placeholderTextColor={Colors.textMuted}
                maxLength={80}
                returnKeyType="next"
                multiline
              />
            </View>

            {/* ── Inline editable story body ────────────────── */}
            <View style={rs.bodyFieldWrap}>
              <Text style={rs.bodyFieldHint}>STORY</Text>
              <TextInput
                style={rs.bodyField as any}
                value={editedBody}
                onChangeText={t => { setEditedBody(t); setSaved(false); }}
                placeholder="Your story..."
                placeholderTextColor={Colors.textMuted}
                multiline
                textAlignVertical="top"
                scrollEnabled={false}
                maxLength={8000}
              />
            </View>

            <View style={{ height: 24 }} />
          </ScrollView>

          {/* ── Sticky bottom actions ──────────────────────── */}
          <View style={rs.stickyBottom as any}>

            {/* Turn into a video? */}
            {videoPromptVisible && (
              <View style={rs.videoPrompt}>
                <View style={rs.videoPromptLeft}>
                  <View style={rs.videoPromptIconWrap}>
                    <Text style={rs.videoPromptIcon}>▶</Text>
                  </View>
                  <View style={rs.videoPromptTextWrap}>
                    <Text style={rs.videoPromptTitle}>Turn this into a video?</Text>
                    <Text style={rs.videoPromptSub}>Create a cinematic version of your story</Text>
                  </View>
                </View>
                <View style={rs.videoPromptBtns}>
                  <TouchableOpacity
                    style={rs.videoPromptLater}
                    onPress={() => setVideoPromptVisible(false)}
                    activeOpacity={0.7}
                  >
                    <Text style={rs.videoPromptLaterText}>Later</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={rs.videoPromptYes}
                    onPress={() => {
                      setVideoPromptVisible(false);
                      navigation.navigate('StoryCreate');
                    }}
                    activeOpacity={0.85}
                  >
                    <Text style={rs.videoPromptYesText}>Yes  →</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Suggestion chips */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={rs.chipsRow}
            >
              {REGEN_SUGGESTIONS.map(s => (
                <TouchableOpacity
                  key={s}
                  style={rs.chip}
                  onPress={() => setRegenInput(s)}
                  activeOpacity={0.7}
                >
                  <Text style={rs.chipText}>{s}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Regenerate input row */}
            <View style={rs.regenRow}>
              <TextInput
                style={rs.regenInput as any}
                value={regenInput}
                onChangeText={setRegenInput}
                placeholder="Tell it what to change..."
                placeholderTextColor={Colors.textMuted}
                returnKeyType="send"
                onSubmitEditing={() => handleRegenerate(regenInput)}
              />
              <TouchableOpacity
                style={rs.regenBtn}
                onPress={() => handleRegenerate(regenInput)}
                activeOpacity={0.75}
              >
                <Text style={rs.regenBtnIcon}>↺</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[rs.regenBtn, rs.regenBtnSend]}
                onPress={() => regenInput.trim() ? handleRegenerate(regenInput) : handleSave()}
                activeOpacity={0.8}
              >
                <Text style={rs.regenBtnSendIcon}>
                  {regenInput.trim() ? '→' : '★'}
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        </>
      )}
    </KeyboardAvoidingView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────
const rs = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.md,
    paddingTop: Platform.OS === 'android'
      ? (StatusBar.currentHeight ?? 0) + Spacing.md
      : Spacing.md,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
    ...(Platform.OS === 'web'
      ? { backdropFilter: 'blur(18px)', backgroundColor: 'rgba(10,10,10,0.85)' }
      : {}),
  },
  backBtn:    { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  backArrow:  { fontSize: 22, color: Colors.gold },
  homeIcon:   { fontSize: 20, color: Colors.textSecondary },
  headerTitle:{ fontSize: Typography.sizes.sm, color: Colors.text, letterSpacing: 3, fontWeight: '700' },

  scroll: { paddingBottom: 8 },

  // ── Carousel ─────────────────────────────────────────────
  carouselWrap: { height: 300, position: 'relative', overflow: 'hidden' },
  slide:        { height: 300, position: 'relative' },
  cover:        { width: '100%', height: 300 },
  coverGrad: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.28)',
  },
  tagRow: {
    position: 'absolute', top: 14, left: 14,
    flexDirection: 'row', gap: 6,
  },
  tag: {
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4,
    backgroundColor: 'rgba(201,168,76,0.18)',
    borderWidth: 1, borderColor: 'rgba(201,168,76,0.5)',
  },
  tagWatch: {
    backgroundColor: 'rgba(80,120,255,0.18)',
    borderColor: 'rgba(80,120,255,0.5)',
  },
  tagText: { color: Colors.text, fontSize: 9, letterSpacing: 1.5, fontWeight: '700' },

  coverGenreWrap: {
    position: 'absolute', bottom: 28, left: 0, right: 0,
    paddingHorizontal: 20, gap: 3,
  },
  coverGenre:  { color: Colors.gold, fontSize: 10, letterSpacing: 2.5, fontWeight: '700' },
  coverProt:   { color: Colors.textSecondary, fontSize: 12, fontStyle: 'italic' },

  dotsRow: {
    position: 'absolute', bottom: 10, left: 0, right: 0,
    flexDirection: 'row', justifyContent: 'center', gap: 6,
  },
  dot: {
    width: 5, height: 5, borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  dotActive: { backgroundColor: Colors.gold, width: 16 },

  // ── Inline editable title ─────────────────────────────────
  titleFieldWrap: {
    marginHorizontal: 20, marginTop: 20,
    borderBottomWidth: 1, borderBottomColor: Colors.borderGold,
    paddingBottom: 8,
  },
  titleField: {
    color: Colors.text, fontSize: 24,
    fontFamily: Typography.fontSerif, lineHeight: 32,
    outlineStyle: 'none',
  },

  // ── Inline editable body ──────────────────────────────────
  bodyFieldWrap: {
    marginHorizontal: 20, marginTop: 20,
    borderWidth: 1, borderColor: Colors.border,
    borderRadius: Radius.md, backgroundColor: Colors.surface,
    padding: 16,
  },
  bodyFieldHint: {
    fontSize: 10, color: Colors.textMuted,
    letterSpacing: 2, marginBottom: 12,
  },
  bodyField: {
    color: Colors.textSecondary, fontSize: 15,
    fontFamily: Typography.fontSerif, lineHeight: 26,
    minHeight: 320,
    outlineStyle: 'none',
  },

  // ── Sticky bottom bar ─────────────────────────────────────
  stickyBottom: {
    borderTopWidth: 1, borderTopColor: Colors.border,
    backgroundColor: Colors.background,
    paddingHorizontal: 16, paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 28 : 16,
    gap: 10,
    ...(Platform.OS === 'web'
      ? { backdropFilter: 'blur(18px)', backgroundColor: 'rgba(10,10,10,0.92)' }
      : {}),
  },

  // "Turn into a video?" prompt
  videoPrompt: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: Radius.md,
    borderWidth: 1, borderColor: 'rgba(80,120,255,0.35)',
    backgroundColor: 'rgba(80,120,255,0.07)',
    paddingHorizontal: 14, paddingVertical: 12,
    gap: 10,
  },
  videoPromptLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  videoPromptIconWrap: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(80,120,255,0.15)',
    borderWidth: 1, borderColor: 'rgba(80,120,255,0.4)',
    alignItems: 'center', justifyContent: 'center',
  },
  videoPromptIcon:     { fontSize: 14, color: '#7090FF' },
  videoPromptTextWrap: { flex: 1, gap: 2 },
  videoPromptTitle:    { fontSize: 13, color: Colors.text, fontWeight: '600' },
  videoPromptSub:      { fontSize: 11, color: Colors.textMuted },
  videoPromptBtns:     { flexDirection: 'row', gap: 8, alignItems: 'center' },
  videoPromptLater: {
    paddingHorizontal: 12, paddingVertical: 7,
    borderRadius: Radius.full,
    borderWidth: 1, borderColor: Colors.border,
  },
  videoPromptLaterText: { fontSize: 12, color: Colors.textMuted },
  videoPromptYes: {
    paddingHorizontal: 14, paddingVertical: 7,
    borderRadius: Radius.full,
    backgroundColor: '#5078FF',
  },
  videoPromptYesText: { fontSize: 12, color: '#fff', fontWeight: '700' },

  // Suggestion chips
  chipsRow: { paddingHorizontal: 2, gap: 8, flexDirection: 'row', paddingBottom: 2 },
  chip: {
    paddingHorizontal: 12, paddingVertical: 7,
    borderRadius: Radius.full,
    borderWidth: 1, borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  chipText: { color: Colors.textSecondary, fontSize: 12, letterSpacing: 0.3 },

  // Regenerate input row
  regenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: Radius.md,
    borderWidth: 1, borderColor: Colors.border,
    backgroundColor: Colors.surface,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  regenInput: {
    flex: 1,
    color: Colors.text,
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    outlineStyle: 'none',
  },
  regenBtn: {
    width: 40, height: 40, borderRadius: Radius.md,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: Colors.background,
    borderWidth: 1, borderColor: Colors.border,
  },
  regenBtnIcon: { fontSize: 18, color: Colors.textSecondary },
  regenBtnSend: { backgroundColor: Colors.gold, borderColor: Colors.gold },
  regenBtnSendIcon: { fontSize: 16, color: Colors.background, fontWeight: '700' },
});
