import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  Image, Animated, Platform, StatusBar, Easing,
  Modal, TextInput, KeyboardAvoidingView,
} from 'react-native';
import { Colors, Typography, Radius, Spacing } from '../theme';
import { saveGeneratedStory } from '../navigation/AppNavigator';
import BottomNav from '../components/BottomNav';

// ─── Mock story generator ──────────────────────────────────────────────────
const MOCK_STORIES: Record<string, { title: string; body: string; image: string }> = {
  'Dark Fantasy': {
    title: 'The Ashen Crown',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
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

// ─── Edit Modal ────────────────────────────────────────────────────────────
function EditModal({
  visible, title, body,
  onSave, onClose,
}: {
  visible: boolean;
  title: string;
  body: string;
  onSave: (t: string, b: string) => void;
  onClose: () => void;
}) {
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftBody,  setDraftBody]  = useState(body);

  // Sync drafts when modal opens with new content
  useEffect(() => {
    if (visible) { setDraftTitle(title); setDraftBody(body); }
  }, [visible, title, body]);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={em.root}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <StatusBar barStyle="light-content" />

        {/* Header */}
        <View style={em.header as any}>
          <TouchableOpacity style={em.headerBtn} onPress={onClose} activeOpacity={0.7}>
            <Text style={em.cancelText}>CANCEL</Text>
          </TouchableOpacity>
          <Text style={em.headerTitle}>EDIT STORY</Text>
          <TouchableOpacity
            style={em.headerBtn}
            onPress={() => onSave(draftTitle.trim() || title, draftBody.trim() || body)}
            activeOpacity={0.7}
          >
            <Text style={em.saveText}>SAVE</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={em.scroll} contentContainerStyle={em.scrollContent}
          keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

          {/* Title field */}
          <Text style={em.fieldLabel}>TITLE</Text>
          <View style={em.titleWrap}>
            <TextInput
              style={em.titleInput as any}
              value={draftTitle}
              onChangeText={setDraftTitle}
              placeholder="Story title..."
              placeholderTextColor={Colors.textMuted}
              maxLength={80}
              returnKeyType="next"
            />
          </View>

          {/* Char count */}
          <Text style={em.charCount}>{draftTitle.length} / 80</Text>

          {/* Divider */}
          <View style={em.divider} />

          {/* Body field */}
          <Text style={em.fieldLabel}>STORY</Text>
          <View style={em.bodyWrap}>
            <TextInput
              style={em.bodyInput as any}
              value={draftBody}
              onChangeText={setDraftBody}
              placeholder="Your story text..."
              placeholderTextColor={Colors.textMuted}
              multiline
              textAlignVertical="top"
              scrollEnabled={false}
              maxLength={8000}
            />
          </View>
          <Text style={em.charCount}>{draftBody.length} / 8000 characters</Text>

          <View style={{ height: 40 }} />
        </ScrollView>

        {/* Sticky save button */}
        <View style={em.footer}>
          <TouchableOpacity
            style={em.saveBtn}
            onPress={() => onSave(draftTitle.trim() || title, draftBody.trim() || body)}
            activeOpacity={0.85}
          >
            <Text style={em.saveBtnText}>✓  SAVE CHANGES</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const em = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.md, paddingVertical: 14,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 14 : 14,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
    backgroundColor: Colors.background,
    ...(Platform.OS === 'web' ? { backdropFilter: 'blur(18px)' } : {}),
  },
  headerBtn: { minWidth: 60 },
  headerTitle: { fontSize: Typography.sizes.xs, color: Colors.text, letterSpacing: 3, fontWeight: '700' },
  cancelText: { fontSize: Typography.sizes.xs, color: Colors.textMuted, letterSpacing: 1.5 },
  saveText: { fontSize: Typography.sizes.xs, color: Colors.gold, fontWeight: '700', letterSpacing: 1.5, textAlign: 'right' },

  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: Spacing.md, paddingTop: Spacing.lg },

  fieldLabel: {
    fontSize: Typography.sizes.xs, color: Colors.gold,
    letterSpacing: 2.5, fontWeight: '700', marginBottom: Spacing.sm,
  },
  titleWrap: {
    borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.md,
    backgroundColor: Colors.surface, paddingHorizontal: 14,
  },
  titleInput: {
    height: 48, color: Colors.text,
    fontSize: Typography.sizes.lg, fontFamily: Typography.fontSerif,
    outlineStyle: 'none',
  },
  charCount: {
    fontSize: 11, color: Colors.textMuted,
    textAlign: 'right', marginTop: 4, marginBottom: Spacing.md,
  },
  divider: { height: 1, backgroundColor: Colors.border, marginVertical: Spacing.md },
  bodyWrap: {
    borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.md,
    backgroundColor: Colors.surface, padding: 14, minHeight: 320,
  },
  bodyInput: {
    color: Colors.text, fontSize: Typography.sizes.md,
    fontFamily: Typography.fontSerif, lineHeight: 26,
    minHeight: 300, outlineStyle: 'none',
  },

  footer: {
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.md,
    paddingBottom: Platform.OS === 'ios' ? 28 : Spacing.md,
    borderTopWidth: 1, borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
  saveBtn: {
    backgroundColor: Colors.gold, borderRadius: Radius.md,
    paddingVertical: 15, alignItems: 'center',
  },
  saveBtnText: { fontSize: Typography.sizes.sm, color: Colors.background, fontWeight: '700', letterSpacing: 2 },
});

// ─── Main Screen ───────────────────────────────────────────────────────────
export default function StoryResultScreen({ navigation, route }: any) {
  const { genre, format, length, tone, protagonist } = route.params ?? {};

  const [phase,        setPhase]        = useState<'generating' | 'result'>('generating');
  const [saved,        setSaved]        = useState(false);
  const [editVisible,  setEditVisible]  = useState(false);
  const [editedTitle,  setEditedTitle]  = useState('');
  const [editedBody,   setEditedBody]   = useState('');

  const story   = getFallbackStory(genre);
  const isWatch = format === 'watch';

  // Initialise editable content once story loads
  useEffect(() => {
    if (phase === 'result' && !editedTitle) {
      setEditedTitle(story.title);
      setEditedBody(story.body);
    }
  }, [phase]);

  const displayTitle = editedTitle || story.title;
  const displayBody  = editedBody  || story.body;

  const handleSave = () => {
    if (saved) return;
    saveGeneratedStory(
      {
        title: displayTitle,
        category: genre?.toUpperCase() ?? 'STORY',
        desc: displayBody.slice(0, 100) + '...',
        image: story.image,
      },
      isWatch ? 'video' : 'storybook',
    );
    setSaved(true);
  };

  const handleEditSave = (newTitle: string, newBody: string) => {
    setEditedTitle(newTitle);
    setEditedBody(newBody);
    setSaved(false); // content changed — require re-save
    setEditVisible(false);
  };

  const handleRegenerate = () => {
    setPhase('generating');
    setSaved(false);
    setEditedTitle('');
    setEditedBody('');
  };

  const handleCreateNew = () => {
    navigation.navigate('StoryCreate');
  };

  const handleGoHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={rs.root}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={rs.header as any}>
        <TouchableOpacity style={rs.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Text style={rs.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={rs.headerTitle}>
          {phase === 'generating' ? 'GENERATING...' : 'YOUR STORY'}
        </Text>
        {/* Home shortcut top-right */}
        <TouchableOpacity style={rs.backBtn} onPress={handleGoHome} activeOpacity={0.7}>
          <Text style={rs.homeIcon}>⌂</Text>
        </TouchableOpacity>
      </View>

      {phase === 'generating' ? (
        <GeneratingView onDone={() => setPhase('result')} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={rs.scroll}>

          {/* Cover image */}
          <View style={rs.coverWrap}>
            <Image source={{ uri: story.image }} style={rs.cover} resizeMode="cover" />
            <View style={rs.coverGrad} />

            {/* Tags top-left */}
            <View style={rs.tagRow}>
              <View style={[rs.tag, isWatch && rs.tagWatch]}>
                <Text style={rs.tagText}>{isWatch ? '▶  WATCH' : '◎  READ'}</Text>
              </View>
              {length && <View style={rs.tag}><Text style={rs.tagText}>{length.toUpperCase()}</Text></View>}
              {tone   && <View style={rs.tag}><Text style={rs.tagText}>{tone.toUpperCase()}</Text></View>}
            </View>

            {/* Title over image */}
            <View style={rs.coverContent}>
              {genre && <Text style={rs.coverGenre}>{genre.toUpperCase()}</Text>}
              <Text style={rs.coverTitle}>{displayTitle}</Text>
              {protagonist ? <Text style={rs.coverProt}>feat. {protagonist}</Text> : null}
            </View>
          </View>

          {/* Story body */}
          <View style={rs.bodyWrap}>
            {displayBody.split('\n\n').map((para, i) => (
              <Text key={i} style={rs.para}>{para}</Text>
            ))}
          </View>

          {/* ── ChatGPT-style action bar ─────────────────────── */}
          <View style={rs.storyActionBar}>
            {/* Edit — primary, full width */}
            <TouchableOpacity
              style={rs.editStoryBtn}
              onPress={() => setEditVisible(true)}
              activeOpacity={0.8}
            >
              <Text style={rs.editStoryIcon}>✎</Text>
              <Text style={rs.editStoryText}>Edit Story</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={rs.actionBarDivider} />

            {/* Secondary icon actions */}
            <View style={rs.actionBarIcons}>
              <TouchableOpacity style={rs.iconBtn} onPress={handleRegenerate} activeOpacity={0.7}>
                <Text style={rs.iconBtnIcon}>↺</Text>
                <Text style={rs.iconBtnLabel}>Regenerate</Text>
              </TouchableOpacity>
              <TouchableOpacity style={rs.iconBtn} onPress={handleCreateNew} activeOpacity={0.7}>
                <Text style={rs.iconBtnIcon}>✦</Text>
                <Text style={rs.iconBtnLabel}>New</Text>
              </TouchableOpacity>
              <TouchableOpacity style={rs.iconBtn} onPress={handleGoHome} activeOpacity={0.7}>
                <Text style={rs.iconBtnIcon}>⌂</Text>
                <Text style={rs.iconBtnLabel}>Home</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Actions */}
          <View style={rs.actions}>
            <TouchableOpacity
              style={[rs.actionBtn, saved && rs.actionBtnSaved]}
              onPress={handleSave}
              activeOpacity={0.85}
            >
              <Text style={[rs.actionBtnText, saved && rs.actionBtnTextSaved]}>
                {saved ? '✓  SAVED TO FEED' : '＋  SAVE TO FEED'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 16 }} />
        </ScrollView>
      )}

      {/* Bottom nav — always visible so user can jump anywhere */}
      <BottomNav active="create" onNavigate={(s) => navigation.navigate(s)} />

      {/* Edit modal */}
      <EditModal
        visible={editVisible}
        title={displayTitle}
        body={displayBody}
        onSave={handleEditSave}
        onClose={() => setEditVisible(false)}
      />
    </View>
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
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  backArrow: { fontSize: 22, color: Colors.gold },
  homeIcon: { fontSize: 22, color: Colors.textMuted },
  headerTitle: { fontSize: Typography.sizes.sm, color: Colors.text, letterSpacing: 3, fontWeight: '700' },

  scroll: { paddingBottom: 24 },

  coverWrap: { height: 300, position: 'relative' },
  cover: { width: '100%', height: 300 },
  coverGrad: {
    position: 'absolute', top: 80, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.82)',
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

  coverContent: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: 20, paddingBottom: 20, gap: 4,
  },
  coverGenre: { color: Colors.gold, fontSize: 10, letterSpacing: 2.5 },
  coverTitle: { color: Colors.text, fontSize: 26, fontFamily: Typography.fontSerif, lineHeight: 32 },
  coverProt: { color: Colors.textSecondary, fontSize: 12, fontStyle: 'italic' },

  bodyWrap: { paddingHorizontal: 20, paddingTop: 24, gap: 14 },
  para: { color: Colors.textSecondary, fontSize: 15, lineHeight: 25, fontFamily: Typography.fontSerif },

  // ChatGPT-style action bar below the story
  storyActionBar: {
    marginHorizontal: 20, marginTop: 20,
    borderRadius: Radius.md,
    borderWidth: 1, borderColor: Colors.border,
    backgroundColor: Colors.surface,
    overflow: 'hidden',
  },
  editStoryBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 14,
    backgroundColor: 'rgba(201,168,76,0.07)',
  },
  editStoryIcon: { fontSize: 18, color: Colors.gold },
  editStoryText: {
    fontSize: Typography.sizes.md, color: Colors.gold,
    fontWeight: '700', letterSpacing: 1,
  },
  actionBarDivider: { height: 1, backgroundColor: Colors.border },
  actionBarIcons: {
    flexDirection: 'row',
  },
  iconBtn: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    paddingVertical: 12, gap: 4,
    borderRightWidth: 1, borderRightColor: Colors.border,
  },
  iconBtnIcon: { fontSize: 16, color: Colors.textSecondary },
  iconBtnLabel: { fontSize: 10, color: Colors.textMuted, letterSpacing: 1 },

  actions: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  actionBtn: {
    backgroundColor: Colors.gold, borderRadius: Radius.md,
    paddingVertical: 15, alignItems: 'center',
  },
  actionBtnSaved: {
    backgroundColor: 'rgba(201,168,76,0.15)',
    borderWidth: 1, borderColor: Colors.gold,
  },
  actionBtnText: { fontSize: Typography.sizes.sm, color: Colors.background, fontWeight: '700', letterSpacing: 2 },
  actionBtnTextSaved: { color: Colors.gold },
});
