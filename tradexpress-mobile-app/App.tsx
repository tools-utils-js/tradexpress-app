import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';

interface TokenLedgerRow {
  id: number;
  title: string;
  category: string;
}

export default function App() {
  const [serverUrl] = useState('http://192.168.100.11:8000');
  const [telemetryActive, setTelemetryActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [ledgerRows, setLedgerRows] = useState<TokenLedgerRow[]>([]);

  useEffect(() => {
    fetchMobileLedgerData();
  }, []);

  const fetchMobileLedgerData = async () => {
    try {
      const res = await fetch(`${serverUrl}/api/story/all`);
      const result = await res.json();
      if (result.success) {
        setLedgerRows(result.data || []);
        setTelemetryActive(true);
      }
    } catch (err) {
      // Fallback simulation matrix if local area network connections shift
      setLedgerRows([
        { id: 101, title: "🔒 Enterprise Token Bond Matrix Sync", category: "Alpha Tier" },
        { id: 102, title: "🌿 ASEAN Green Trade Route Compliance", category: "Customs" }
      ]);
    }
  };

  const filteredRows = ledgerRows.filter(row => 
    row.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Mobile Top Bar Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>⚡ KENWELL MOBILE</Text>
          <Text style={styles.headerSubtitle}>Ecosystem Deployment Grid Mobile Node</Text>
        </View>
        <View style={[styles.badge, telemetryActive ? styles.badgeGreen : styles.badgeAmber]}>
          <Text style={styles.badgeText}>{telemetryActive ? "LIVE" : "SYNCING"}</Text>
        </View>
      </View>

      {/* Coordinate Scale Information Banner */}
      <View style={styles.enterpriseBanner}>
        <Text style={styles.bannerTitle}>Coordinate Scale • Enterprise Layer</Text>
        <Text style={styles.bannerText}>Continuous 24h SQLite binary snapshot automation active.</Text>
      </View>

      {/* Real-time Filter Matrix Search Bar */}
      <View style={styles.searchSection}>
        <TextInput 
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="🔍 Live filter mobile rows matrix..."
          placeholderTextColor="#475569"
        />
      </View>

      {/* Dynamic Data Stream Scrollable List Ledger */}
      <ScrollView style={styles.scrollList}>
        <Text style={styles.sectionTitle}>DYNAMIC TRACKING MATRIX RECORES</Text>
        {filteredRows.map((row) => (
          <View key={row.id} style={styles.cardItem}>
            <View style={styles.cardBody}>
              <Text style={styles.cardId}>#{row.id}</Text>
              <Text style={styles.cardTitle}>{row.title}</Text>
            </View>
            <View style={styles.tagContainer}>
              <Text style={styles.tagText}>{row.category.toUpperCase()}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617', pt: StatusBar.currentHeight },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderColor: '#1e293b' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#ffffff', letterSpacing: 0.5 },
  headerSubtitle: { fontSize: 10, color: '#94a3b8', marginTop: 2 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  badgeGreen: { backgroundColor: '#065f46' },
  badgeAmber: { backgroundColor: '#78350f' },
  badgeText: { fontSize: 9, fontWeight: '700', color: '#ffffff' },
  enterpriseBanner: { margin: 20, padding: 15, backgroundColor: '#022c22', borderWidth: 1, borderColor: '#059669', borderRadius: 12 },
  bannerTitle: { fontSize: 13, fontWeight: '700', color: '#34d399' },
  bannerText: { fontSize: 11, color: '#a7f3d0', marginTop: 4, lineHeight: 16 },
  searchSection: { paddingHorizontal: 20, marginBottom: 10 },
  searchInput: { backgroundColor: '#0f172a', borderWidth: 1, borderColor: '#334155', borderRadius: 8, paddingHorizontal: 15, paddingVertical: 10, color: '#ffffff', fontSize: 12 },
  scrollList: { flex: 1, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 10, fontWeight: '700', color: '#64748b', tracking: 1, marginBottom: 12 },
  cardItem: { backgroundColor: '#0f172a', borderWidth: 1, borderColor: '#1e293b', borderRadius: 10, padding: 15, marginBottom: 10, flexDirection: 'row', justify: 'space-between', alignItems: 'center' },
  cardBody: { flex: 1, pr: 10 },
  cardId: { fontSize: 10, fontWeight: '700', color: '#475569', fontFamily: 'monospace' },
  cardTitle: { fontSize: 13, fontWeight: '600', color: '#f8fafc', marginTop: 2 },
  tagContainer: { backgroundColor: '#1e3a8a', borderWidth: 1, borderColor: '#1d4ed8', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  tagText: { fontSize: 9, fontWeight: '700', color: '#60a5fa', fontFamily: 'monospace' },
});
