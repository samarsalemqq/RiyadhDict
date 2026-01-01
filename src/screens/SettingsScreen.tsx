import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Switch,
  Alert,
  useColorScheme,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import CloseIcon from "../../assets/close.svg";
import BellIcon from "../../assets/icon_bell.svg";
import SoundIcon from "../../assets/icon_headphone.svg";
import ResetIcon from "../../assets/settings.svg";
import InfoIcon from "../../assets/info.svg";

export default function SettingsScreen() {
  const navigation = useNavigation<any>();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const [dailyNotify, setDailyNotify] = useState(true);
  const [wordSound, setWordSound] = useState(true);

  const colors = {
    bg: isDark ? "#0B0F10" : "#FFFFFF",
    card: isDark ? "#11181A" : "#F4F6F6",
    text: isDark ? "#FFFFFF" : "#111111",
    sub: isDark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.55)",
    border: isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)",
    primary: "#0E6B6D",
  };

  
  return (
    <View style={[styles.screen, { backgroundColor: colors.bg }]}>
      {/* ===== Header ===== */}
      <View style={styles.headerRow}>
       <Pressable
  style={styles.closeBtn}
  onPress={() => navigation.goBack()}
>
  <CloseIcon width={20} height={20} fill={colors.primary} />
</Pressable>

        <Text style={[styles.headerTitle, { color: colors.primary }]}>الإعدادات</Text>

        <View style={{ width: 34 }} />
      </View>

      {/* ===== Sections ===== */}
      <View style={styles.content}>
        <Section title="التفضيلات" colors={colors}>
          <RowSwitch
            title="تنبيه كلمة اليوم"
            subtitle="تفعيل تنبيه يومي بكلمة جديدة"
            Icon={BellIcon}
            value={dailyNotify}
            onValueChange={setDailyNotify}
            colors={colors}
          />

          
        </Section>

       

        <Text style={[styles.note, { color: colors.sub }]}>
          الوضع الليلي وتكبير الخط يتبعان إعدادات الجهاز تلقائيًا.
        </Text>
      </View>
    </View>
  );
}

/* ================= Components ================= */

function Section({
  title,
  colors,
  children,
}: {
  title: string;
  colors: any;
  children: React.ReactNode;
}) {
  return (
    <View style={{ marginBottom: 18 }}>
      <Text style={[styles.sectionTitle, { color: colors.sub }]}>{title}</Text>
      <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {children}
      </View>
    </View>
  );
}

function RowSwitch({
  title,
  subtitle,
  Icon,
  value,
  onValueChange,
  colors,
}: {
  title: string;
  subtitle: string;
  Icon: React.FC<{ width?: number; height?: number; fill?: string; stroke?: string }>;
  value: boolean;
  onValueChange: (v: boolean) => void;
  colors: any;
}) {
  return (
    <View style={styles.row}>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "rgba(0,0,0,0.12)", true: "rgba(14,107,109,0.35)" }}
        thumbColor={value ? colors.primary : "#ffffff"}
      />

      <View style={styles.rowTextCol}>
        <Text style={[styles.rowTitle, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.rowSub, { color: colors.sub }]}>{subtitle}</Text>
      </View>

      <View style={[styles.iconBox, { borderColor: colors.border }]}>
        <Icon width={18} height={18} fill={colors.primary} stroke={colors.primary} />
      </View>
    </View>
  );
}

function RowButton({
  title,
  subtitle,
  Icon,
  onPress,
  colors,
}: {
  title: string;
  subtitle: string;
  Icon: React.FC<{ width?: number; height?: number; fill?: string; stroke?: string }>;
  onPress: () => void;
  colors: any;
}) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <Text style={[styles.rowLink, { color: colors.primary }]}>›</Text>

      <View style={styles.rowTextCol}>
        <Text style={[styles.rowTitle, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.rowSub, { color: colors.sub }]}>{subtitle}</Text>
      </View>

      <View style={[styles.iconBox, { borderColor: colors.border }]}>
        <Icon width={18} height={18} fill={colors.primary} stroke={colors.primary} />
      </View>
    </Pressable>
  );
}

function RowInfo({
  title,
  value,
  Icon,
  colors,
}: {
  title: string;
  value: string;
  Icon: React.FC<{ width?: number; height?: number; fill?: string; stroke?: string }>;
  colors: any;
}) {
  return (
    <View style={styles.row}>
      <Text style={[styles.valueText, { color: colors.sub }]}>{value}</Text>

      <View style={styles.rowTextCol}>
        <Text style={[styles.rowTitle, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.rowSub, { color: colors.sub }]}>معلومات عامة</Text>
      </View>

     <Icon
  width={20}
  height={20}
  fill={colors.primary}
  stroke={colors.primary}
/>

    </View>
  );
}

/* ================= Styles ================= */

const styles = StyleSheet.create({
  screen: { flex: 1 },

  headerRow: {
    paddingTop: 90,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  closeBtn: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: "900",
    textAlign: "center",
  },

  content: { paddingHorizontal: 20, paddingTop: 20 },

  sectionTitle: {
    textAlign: "right",
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 20,
  },

  sectionCard: {
    borderWidth: 1,
    borderRadius: 16,
    overflow: "hidden",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.06)",
  },

  rowTextCol: { flex: 1, alignItems: "flex-end" },

  rowTitle: { fontSize: 16, fontWeight: "800", textAlign: "right" },
  rowSub: { marginTop: 2, fontSize: 12, textAlign: "right" },

  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  valueText: { fontSize: 13, fontWeight: "800" },
  rowLink: { fontSize: 24, fontWeight: "900" },

  note: { marginTop: 10, textAlign: "right", fontSize: 12 },
});
