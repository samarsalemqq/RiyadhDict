import React, { useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  Animated,
  Dimensions,
  ScrollView,
  Linking,
} from "react-native";


import CloseIcon from "../../assets/close.svg";
import MenuIcon from "../../assets/manus.svg";
import GearIcon from "../../assets/settings.svg";
import InfoIcon from "../../assets/info.svg";
import DocIcon from "../../assets/doc.svg";
import PhoneIcon from "../../assets/phone.svg";
import LogoIcon from "../../assets/logo2.svg";

import XIcon from "../../assets/x.svg";
import MailIcon from "../../assets/mail.svg";
import LinkedinIcon from "../../assets/linkedin.svg";

const { height: H } = Dimensions.get("window");



type SheetKey = "about" | "terms" | "contact" | null;

export default function MoreScreen({ navigation }: any) {
  const [sheet, setSheet] = useState<SheetKey>(null);
  const slideY = useRef(new Animated.Value(H)).current;

  const sheetTitle = useMemo(() => {
    if (sheet === "about") return "عن تطبيق معجم الرياض";
    if (sheet === "terms") return "شروط والأحكام";
    if (sheet === "contact") return "تواصل معنا";
    return "";
  }, [sheet]);

  const openSheet = (key: Exclude<SheetKey, null>) => {
    setSheet(key);
    slideY.setValue(H);
    Animated.timing(slideY, {
      toValue: 0,
      duration: 260,
      useNativeDriver: true,
    }).start();
  };

  const closeSheet = () => {
    Animated.timing(slideY, {
      toValue: H,
      duration: 220,
      useNativeDriver: true,
    }).start(() => setSheet(null));
  };

  const openLink = (url: string) => Linking.openURL(url);

  return (
    <View style={styles.screen}>
      {/* ===== Header ===== */}
      <View style={styles.headerRow}>
        <Pressable style={styles.closeBtn} onPress={() => navigation.goBack()}>
          <CloseIcon width={18} height={18} />
        </Pressable>

        <View style={styles.headerRight}>
          <MenuIcon width={24} height={24} />
          <Text style={styles.headerTitle}>المزيد</Text>
        </View>
      </View>

      {/* ===== Items ===== */}
        <View style= {styles.list}>
       <Row title="الأعدادات"  Icon ={GearIcon} onPress={()=>  navigation.navigate("SettingsScreen")}/>
        
        <Row title="عن تطبيق معجم الرياض" Icon={InfoIcon} onPress={() => openSheet("about")} />
        <Row title="شروط والأحكام" Icon={DocIcon} onPress={() => openSheet("terms")} />
        <Row title="تواصل معنا" Icon={PhoneIcon} onPress={() => openSheet("contact")} />
      </View>

      {/* ===== Bottom Sheet Modal ===== */}
      <Modal visible={sheet !== null} transparent animationType="none" onRequestClose={closeSheet}>
        <Pressable style={styles.backdrop} onPress={closeSheet} />

        <Animated.View style={[styles.sheet, { transform: [{ translateY: slideY }] }]}>
          <View style={styles.sheetHandle} />

          {/* header داخل الشيت */}
          <View style={styles.sheetHeader}>
            <LogoIcon width={80} height={44} style={styles.sheetLogo} />
            <View style={styles.divider} />
            <Text style={styles.sheetTitle}>{sheetTitle}</Text>
          </View>

          {/* body */}
          <View style={styles.sheetBody}>
            {sheet === "contact" && (
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                <Text style={styles.contactSubTitle}>
                  أخبرنا إن كان لديك المزيد من الأسئلة أو الاستفسارات
                </Text>

                <ContactCard
                  icon={<XIcon width={26} height={26} />}
                  onPress={() => openLink("https://twitter.com/KSGAFAL/")}
                />

                <ContactCard
                  icon={<MailIcon width={26} height={26} />}
                  onPress={() => openLink("mailto:info@ksaa.gov.sa")}
                />

                <ContactCard
                  icon={<LinkedinIcon width={26} height={26} />}
                  onPress={() => openLink("https://www.linkedin.com/company/ksgafal/")}
                />
              </ScrollView>
            )}

            {sheet === "about" && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.sheetText}>
                  معجم الرياض للغة العربية المعاصرة هو معجم رقمي يضم الألفاظ والتراكيب العربية الفصيحة المعاصرة،
                  صُمّم وفق منهجيات حديثة في الصناعة المعجمية لتقديم محتوى واضح وسهل الاستخدام.{"\n\n"}
                  يهدف المعجم إلى:{"\n"}
                  • توفير معجم شامل للألفاظ والتراكيب العربية المعاصرة.{"\n"}
                  • بناء معجم معياري يعتمد على أحدث المنهجيات الرقمية.{"\n"}
                  • خدمة الناطقين بالعربية والناطقين بغيرها باختلاف مستوياتهم.{"\n"}
                  • توظيف التقنيات الحديثة والذكاء الاصطناعي.{"\n\n"}
                  وقد بُني المعجم وفق المعيار العالمي (LMF ISO 24613)، اعتمادًا على مدونات لغوية تتجاوز 400 مليون كلمة،
                  ويمكن استخدامه عبر الموقع والتطبيقات الذكية وإضافات المتصفح.
                </Text>
              </ScrollView>
            )}

            {sheet === "terms" && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.sheetText}>
                  هذا مكان نص الشروط والأحكام… (اكتبي البنود المختصرة أو رابط الشروط)
                </Text>
              </ScrollView>
            )}
          </View>
        </Animated.View>
      </Modal>
    </View>
  );
}

function Row({
  title,
  Icon,
  onPress,
}: {
  title: string;
  Icon: React.FC<{ width?: number; height?: number; fill?: string; stroke?: string }>;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <Icon width={20} height={20} />
      <Text style={styles.rowText}>{title}</Text>
    </Pressable>
  );
}

function ContactCard({
  icon,
  onPress,
}: {
  icon: React.ReactNode;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.contactCard} onPress={onPress}>
      <Text style={styles.contactArrow}>‹</Text>
      <View style={styles.contactIcon}>{icon}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  /* ===== Screen ===== */
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 90,         
    paddingHorizontal: 18,  

  },

  /* ===== Header ===== */
  headerRow: {
    paddingTop: 0,
    paddingHorizontal: 0,
    paddingBottom: 50,     
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

  headerRight: { flexDirection: "row-reverse", alignItems: "center", gap: 10 },
  headerTitle: { fontSize: 26, fontWeight: "900", color: "#0E6B6D" },

  /* ===== List ===== */
  list: { marginTop: 0, paddingHorizontal: 0, gap: 22 },

  row: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 18,
  },

  rowText: { fontSize: 15, fontWeight: "700", color: "#111", textAlign: "right" },

  /* ===== Modal ===== */
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.45)" },

  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: Math.min(520, H * 0.62),
    backgroundColor: "#fff",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingTop: 10,
  },

  sheetHandle: {
    alignSelf: "center",
    width: 90,
    height: 6,
    borderRadius: 999,
    backgroundColor: "#111",
    opacity: 0.9,
    marginBottom: 12,
  },

  /* ===== Sheet Header ===== */
  sheetHeader: { alignItems: "flex-end", paddingHorizontal: 22, paddingTop: 6 },

  sheetLogo: {
    alignSelf: "flex-end",   
  },

  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#9ECED1",
    opacity: 0.5,
    marginTop: 12,
  },

  sheetTitle: {
    marginTop: 18,
    fontSize: 26,
    fontWeight: "900",
    color: "#0E6B6D",
    textAlign: "right",
  },

  /* ===== Sheet Body ===== */
  sheetBody: { paddingHorizontal: 22, paddingTop: 18 },

  sheetText: { fontSize: 16, lineHeight: 24, color: "#333", textAlign: "right" },

  /* ===== Contact UI ===== */
  contactSubTitle: {
    fontSize: 14,
    color: "#333",
    opacity: 0.8,
    textAlign: "right",
    marginBottom: 12,
  },

  contactCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#9ECED1",
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 18,
    marginBottom: 14,
  },

  contactArrow: { fontSize: 24, color: "#0E6B6D" },

  contactIcon: { justifyContent: "center", alignItems: "center" },

  commentText: {
    fontSize: 13,
    color: "#333",
    opacity: 0.7,
    textAlign: "right",
    marginTop: 6,
  },
});
