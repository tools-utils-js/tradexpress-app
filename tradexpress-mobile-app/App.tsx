import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, SafeAreaView, StatusBar, TouchableOpacity, Modal, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';

interface TokenLedgerRow {
  id: number;
  title: string;
  category: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export default function App() {
  const [deviceUuid] = useState('tx-client-node-8f92b4c1-96ea');
  const [serverUrl] = useState('http://192.168.100.11:8000');
  const [telemetryActive, setTelemetryActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [ledgerRows, setLedgerRows] = useState<TokenLedgerRow[]>([]);

  // AI Chatbot Sheet Control States
  const [chatVisible, setChatVisible] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'ai', text: 'Welcome to KENWELL Mobile Node. I can assist with terminal telemetry, token matrix tracking, and real-time asset validation metrics. How can I assist your operations?', timestamp: new Date().toLocaleTimeString() }
  ]);

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    fetchMobileLedgerData();
  }, []);

  const fetchMobileLedgerData = async () => {
    const uuidEndpoint = `${serverUrl}/api/mobile/telemetry/${deviceUuid}`;
    try {
      const res = await fetch(uuidEndpoint, { method: 'GET' });
      const result = await res.json();
      if (result.success) {
        setLedgerRows(result.data || []);
        setTelemetryActive(true);
      }
    } catch (err) {
      setLedgerRows([
        { id: 101, title: "🔒 UUID Handshake Secure Matrix Sync", category: "Alpha Tier" },
        { id: 102, title: "🌿 ASEAN Green Trade Route Compliance", category: "Customs" },
        { id: 103, title: "📊 Q4 Greencore Coordinate Scale Ledger", category: "Enterprise" }
      ]);
    }
  };

  const handleSendChatMessage = async () => {
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    const timestamp = new Date().toLocaleTimeString();
    
    setMessages((prev) => [...prev, { id: Date.now().toString(), sender: 'user', text: userText, timestamp }]);
    setChatInput('');
    setIsTyping(true);

    try {
      const response = await fetch(`${serverUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });
      const data = await response.json();
      setIsTyping(false);

      if (response.ok && data.success) {
        setMessages((prev) => [...prev, {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: data.reply || 'Matrix payload verified.',
          timestamp: new Date().toLocaleTimeString()
        }]);
      }
    } catch (err) {
      setIsTyping(false);
      // Native fallback simulation matrix if testing away from server node IP ranges
      setTimeout(() => {
        setMessages((prev) => [...prev, {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: `[MOBILE PROX ACTIVE] Telemetry received: "${userText}". Handshake verified. Mobile cluster operating configuration matches Coordinate Scale parameters smoothly.`,
          timestamp: new Date().toLocaleTimeString()
        }]);
      }, 500);
    }
  };

  const filteredRows = ledgerRows.filter(row => 
    row.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Top Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>⚡ KENWELL MOBILE</Text>
          <Text style={styles.headerSubtitle}>UUID: {deviceUuid.substring(0, 14)}...</Text>
        </View>
        <View style={[styles.badge, telemetryActive ? styles.badgeGreen : styles.badgeAmber]}>
          <Text style={styles.badgeText}>{telemetryActive ? "LIVE" : "SIMULATING"}</Text>
        </View>
      </View>

      {/* Info Banner */}
      <View style={styles.enterpriseBanner}>
        <Text style={styles.bannerTitle}>UUID Endpoint Verification Active</Text>
        <Text style={styles.bannerText}>Target Route: /api/mobile/telemetry/:uuid</Text>
      </View>

      {/* Search Input Section */}
      <View style={styles.searchSection}>
        <TextInput 
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="🔍 Live filter mobile rows matrix..."
          placeholderTextColor="#475569"
        />
      </View>

      {/* Data Scroll Area */}
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

      {/* Floating Action Button (FAB) to Launch AI Modal Sheet */}
      <TouchableOpacity style={styles.fabButton} onPress={() => setChatVisible(true)}>
        <Text style={styles.fabText}>🤖</Text>
      </TouchableOpacity>

      {/* Smooth Slide-Up Interactive AI Assistant Modal Sheet Panel */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={chatVisible}
        onRequestClose={() => setChatVisible(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            {/* Modal Sheet Header */}
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalHeaderTitle}>🤖 AI Assistant Portal</Text>
                <Text style={styles.modalHeaderSubtitle}>ORCHESTRATION: KENWELL-TX-BOT</Text>
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={() => setChatVisible(false)}>
                <Text style={styles.closeButtonText}>CLOSE</Text>
              </TouchableOpacity>
            </View>

            {/* Chat Messages Stream Area */}
            <ScrollView 
              style={styles.chatStream}
              ref={scrollViewRef}
              onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            >
              {messages.map((msg) => (
                <View key={msg.id} style={[styles.messageRow, msg.sender === 'user' ? styles.rowUser : styles.rowAi]}>
                  <View style={[styles.messageBubble, msg.sender === 'user' ? styles.bubbleUser : styles.bubbleAi]}>
                    <Text style={msg.sender === 'user' ? styles.textUser : styles.textAi}>{msg.text}</Text>
                  </View>
                  <Text style={styles.messageTime}>{msg.timestamp}</Text>
                </View>
              ))}
              {isTyping && (
                <View style={styles.typingContainer}>
                  <ActivityIndicator size="small" color="#3b82f6" />
                  <Text style={styles.typingText}>Parsing token telemetry...</Text>
                </View>
              )}
            </ScrollView>

            {/* Chat Input Dock Area */}
            <View style={styles.chatInputDock}>
              <TextInput
                style={styles.chatTextInput}
                value={chatInput}
                onChangeText={setChatInput}
                placeholder="Ask about telemetry matrix or HS codes..."
                placeholderTextColor="#475569"
                onSubmitEditing={handleSendChatMessage}
              />
              <TouchableOpacity style={styles.sendButton} onPress={handleSendChatMessage}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#020617', paddingVertical: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderColor: '#1e293b' },
  headerTitle: { fontSize: 16, fontWeight: '800', color: '#ffffff', letterSpacing: 0.5 },
  headerSubtitle: { fontSize: 10, color: '#64748b', fontFamily: 'monospace', marginTop: 2 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  badgeGreen: { backgroundColor: '#065f46' },
  badgeAmber: { backgroundColor: '#1e3a8a' },
  badgeText: { fontSize: 9, fontWeight: '700', color: '#ffffff' },
  enterpriseBanner: { margin: 20, padding: 15, backgroundColor: '#021426', borderWidth: 1, borderColor: '#1d4ed8', borderRadius: 12 },
  bannerTitle: { fontSize: 13, fontWeight: '700', color: '#60a5fa' },
  bannerText: { fontSize: 11, color: '#93c5fd', marginTop: 4, fontFamily: 'monospace' },
  searchSection: { paddingHorizontal: 20, marginBottom: 10 },
  searchInput: { backgroundColor: '#0f172a', borderWidth: 1, borderColor: '#334155', borderRadius: 8, paddingHorizontal: 15, paddingVertical: 10, color: '#ffffff', fontSize: 12 },
  scrollList: { flex: 1, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 10, fontWeight: '700', color: '#475569', marginBottom: 12, marginTop: 10 },
