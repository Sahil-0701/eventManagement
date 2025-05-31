import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontFamily: 'Helvetica',
    fontSize: 12,
    color: '#222',
    lineHeight: 1.6,
    backgroundColor: '#f9fafb',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0d47a1', 
    textAlign: 'center',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  subheading: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#424242',
    fontWeight: '500',
  },
  ticketDetailsBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    marginBottom: 24,
  },
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    color: '#555',
  },
  ticketBox: {
    backgroundColor: '#0d47a1',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 14,
    borderRadius: 6,
    marginBottom: 30,
    letterSpacing: 1,
  },
  note: {
    fontSize: 10,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 30,
  },
  termsHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0d47a1',
    marginBottom: 12,
    textAlign: 'center',
  },
  termsList: {
    fontSize: 10,
    color: '#444',
    marginBottom: 6,
    paddingLeft: 12,
    textAlign: 'justify',
  },
});

const TicketPDF = ({ booking }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.heading}>{booking.eventTitle}</Text>
      <Text style={styles.subheading}>Entry Ticket</Text>

      <View style={styles.ticketDetailsBox}>
        <View style={styles.fieldRow}>
          <Text style={styles.label}>Booking Ref:</Text>
          <Text style={styles.value}>{booking.bookingReference}</Text>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.label}>Quantity:</Text>
          <Text style={styles.value}>{booking.quantity}</Text>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.label}>Amount:</Text>
          <Text style={styles.value}>${booking.totalAmount.toFixed(2)}</Text>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>Confirmed</Text>
        </View>
      </View>

      <Text style={styles.ticketBox}>Ticket No: {booking.ticketNumber}</Text>

      <Text style={styles.note}>
        Please carry a digital or printed version of this ticket to the event venue.
      </Text>

      <View style={styles.hr} />

      <Text style={styles.termsHeading}>Terms & Conditions</Text>
    <View>
  <Text style={styles.termsList}>• This ticket is strictly non-refundable and non-transferable under any circumstances once purchased.</Text>
  <Text style={styles.termsList}>• Please ensure you arrive at least 30 minutes before the scheduled event start time to allow for smooth entry.</Text>
  <Text style={styles.termsList}>• Entry to the event venue will only be permitted upon presentation of a valid ticket, either printed or digital.</Text>
  <Text style={styles.termsList}>• The event organizers reserve the right to alter event timings or venue location without prior notice.</Text>
  <Text style={styles.termsList}>• Bringing outside food or beverages into the venue is strictly prohibited for health and safety reasons.</Text>
  <Text style={styles.termsList}>• All attendees are subject to mandatory security screenings upon entry for the safety of all participants.</Text>
  <Text style={styles.termsList}>• Audio and video recording may be prohibited inside the venue to protect copyright and privacy.</Text>
  <Text style={styles.termsList}>• Refunds will only be issued in the event of official cancellation of the event by the organizers.</Text>
  <Text style={styles.termsList}>• By attending this event, you agree to abide by all terms, conditions, and rules set forth by the event organizers.</Text>
</View>

    </Page>
  </Document>
);

export default TicketPDF;
