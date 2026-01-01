import React from "react";
import { View, Text, Pressable, Dimensions, Animated, StyleSheet } from "react-native";
import TrophyIcon from "../assets/Pvd.svg";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH - 32;
const ICON_SIZE = 100;


type SvgComp = React.FC<{ width?: number; height?: number }>;

type Slide = {
  title: string;
  subtitle: string;
  Icon?: SvgComp; 
};

type Props = {
  onRegisterPress?: () => void;
};

export default function ReadingContestSlider({ onRegisterPress }: Props) {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const slides: Slide[] = [
    { title: "مسابقة القراءة", subtitle: "شارك وسجّل الآن", Icon: TrophyIcon },
    { title: "جوائز قيّمة", subtitle: "فرصة للفوز وتطوير لغتك", Icon: TrophyIcon },
  ];

  return (
    <View style={styles.wrap}>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH}
        decelerationRate="fast"
        contentContainerStyle={styles.content}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {slides.map((s, idx) => (
          <View key={idx} style={[styles.card, { width: CARD_WIDTH }]}>
            <View style={styles.imageBox}>
              {s.Icon ? (
                <View style={styles.svgCenter}>
                <s.Icon width={ICON_SIZE} height={ICON_SIZE} />
                </View>
              ) : (
                <View style={styles.imagePlaceholder} />
              )}
            </View>

            <View style={styles.textSide}>
              <Text style={styles.title}>{s.title}</Text>
              <Text style={styles.subtitle}>{s.subtitle}</Text>

              <Pressable style={styles.ctaBtn} onPress={onRegisterPress}>
                <Text style={styles.ctaText}>سجّل الآن</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </Animated.ScrollView>

      <View style={styles.dotsRow}>
        {slides.map((_, i) => {
          const inputRange = [(i - 1) * CARD_WIDTH, i * CARD_WIDTH, (i + 1) * CARD_WIDTH];

          const w = scrollX.interpolate({
            inputRange,
            outputRange: [8, 22, 8],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.35, 1, 0.35],
            extrapolate: "clamp",
          });

          const bg = scrollX.interpolate({
            inputRange,
            outputRange: ["rgba(47,126,130,0.25)", "#2F7E82", "rgba(47,126,130,0.25)"],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={i}
              style={[styles.dot, { width: w, opacity, backgroundColor: bg }]}
            />
          );
        })}
      </View>
    </View>
  );
}
/* ================= Styles ================= */

const styles = StyleSheet.create({
  wrap: { marginTop: 12 },

  content: {
    flexDirection: "row-reverse",
    gap: 8,
    paddingHorizontal: 16,
  },

  card: {
    backgroundColor: "#183030ff",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  imageBox: {
    width: 98,
    height: 98,
    borderRadius: 18,
    overflow: "hidden",
  },

  svgCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  imagePlaceholder: { flex: 1 },

  textSide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },

  subtitle: {
    color: "rgba(255,255,255,0.85)",
    marginTop: 6,
    textAlign: "center",
  },

  ctaBtn: {
    marginTop: 12,
    backgroundColor: "#E7F4F5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 999,
    alignSelf: "center",
  },

  ctaText: { color: "#183030ff", fontWeight: "900" },

  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
  },

  dot: { height: 8, borderRadius: 999 },
});
