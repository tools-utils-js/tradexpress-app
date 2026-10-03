import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, SafeAreaView, StatusBar } from 'react-native';

export default function App() {
  const [deviceUuid] = useState('tx-client-node-8f92b4c1-96ea');
  const [serverUrl] = useState('http://192.168.100.11:8000');
  const [telemetryActive, setTelemetryActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [ledgerRows, setLedgerRows] = useState([]);

  useEffect(() => {
    // Uses simulated metrics natively inside the browser playground sandbox environment
    setLedgerRows([
      { id: 101, title: "🔒 UUID Handshake Secure Matrix Sync", category: "Alpha Tier" },
      { id: 102, title: "🌿 ASEAN Green Trade Route Compliance", category: "Customs" },
      { id: 103, title: "📊 Q4 Greencore Coordinate Scale Ledger", category: "Enterprise" }
    ]);
  }, []);

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
          <Text style={styles.headerSubtitle}>UUID: {deviceUuid.substring(0, 14)}...</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>SANDBOX</Text>
        </View>
      </View>

      {/* Coordinate Scale Information Banner */}
      <View style={styles.enterpriseBanner}>
        <Text style={styles.bannerTitle}>UUID Endpoint Verification Active</Text>
        <Text style={styles.bannerText}>Target Route: /api/mobile/telemetry/:uuid</Text>
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
        <Text style={styles.sectionTitle}>DYNAMIC DATA MATRIX RECORDS</Text>
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
  container: { flex: 1, backgroundColor: '#020617', paddingVertical: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderColor: '#1e293b' },
  headerTitle: { fontSize: 16, fontWeight: '800', color: '#ffffff', letterSpacing: 0.5 },
  headerSubtitle: { fontSize: 10, color: '#64748b', fontFamily: 'monospace', marginTop: 2 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, backgroundColor: '#1e3a8a' },
  badgeText: { fontSize: 9, fontWeight: '700', color: '#ffffff' },
  enterpriseBanner: { margin: 20, padding: 15, backgroundColor: '#021426', borderWidth: 1, borderColor: '#1d4ed8', borderRadius: 12 },
  bannerTitle: { fontSize: 13, fontWeight: '700', color: '#60a5fa' },
  bannerText: { fontSize: 11, color: '#93c5fd', marginTop: 4, fontFamily: 'monospace' },
  searchSection: { paddingHorizontal: 20, marginBottom: 10 },
  searchInput: { backgroundColor: '#0f172a', borderWidth: 1, borderColor: '#334155', borderRadius: 8, paddingHorizontal: 15, paddingVertical: 10, color: '#ffffff', fontSize: 12 },
  scrollList: { flex: 1, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 10, fontWeight: '700', color: '#475569', marginBottom: 12, marginTop: 10 },
  cardItem: { backgroundColor: '#0f172a', borderWidth: 1, borderColor: '#1e293b', borderRadius: 10, padding: 15, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardBody: { flex: 1, paddingRight: 10 },
  cardId: { fontSize: 10, fontWeight: '700', color: '#475569', fontFamily: 'monospace' },
  cardTitle: { fontSize: 13, fontWeight: '600', color: '#f8fafc', marginTop: 2 },
  tagContainer: { backgroundColor: '#022c22', borderWidth: 1, borderColor: '#059669', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  tagText: { fontSize: 9, fontWeight: '700', color: '#34d399', fontFamily: 'monospace' },
});
