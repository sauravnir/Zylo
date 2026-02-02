import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Define the interface for strict type safety
interface ZyloReceiptProps {
  order: {
    customerData: {
      firstName: string; lastName: string; email: string; phone: string;
      address: string; city: string; zip: string; country: string; payment_method: string;
    };
    items: Array<{
      id: string; title: string; itemCartQuantity: number; price: number; productSize: string;
    }>;
    orderSummary: {
      orderNumber: string; shippingAmount: number; subTotal: number; symbol: string; totalAmount: number;
    };
  };
}

const styles = StyleSheet.create({
  // Using Helvetica (standard PDF font) to avoid registration errors
  page: { padding: 40, backgroundColor: '#fff', fontSize: 10, color: '#18181b', fontFamily: 'Helvetica' },
  header: { 
    marginBottom: 30, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e4e4e7',
    paddingBottom: 20 
  },
  brand: { fontSize: 24, fontWeight: 'bold', letterSpacing: 2 },
  sectionTitle: { fontSize: 10, fontWeight: 'bold', marginBottom: 8, textTransform: 'uppercase', color: '#71717a' },
  grid: { flexDirection: 'row', marginBottom: 30, gap: 40 },
  col: { flex: 1 },
  infoText: { marginBottom: 2, lineHeight: 1.4 },
  
  tableHeader: { 
    flexDirection: 'row', 
    borderBottomWidth: 1, 
    borderBottomColor: '#18181b', 
    paddingVertical: 8, 
    backgroundColor: '#fafafa'
  },
  tableRow: { 
    flexDirection: 'row', 
    borderBottomWidth: 0.5, 
    borderBottomColor: '#f4f4f5', 
    paddingVertical: 10,
    alignItems: 'center'
  },
  colDesc: { flex: 3 },
  colQty: { flex: 1, textAlign: 'center' },
  colPrice: { flex: 1, textAlign: 'right' },

  totalSection: { marginTop: 30, alignItems: 'flex-end' },
  totalRow: { flexDirection: 'row', gap: 20, marginBottom: 5 },
  grandTotal: { fontSize: 14, fontWeight: 'bold', marginTop: 8, borderTopWidth: 1, paddingTop: 8, color: '#000' },
  footer: { position: 'absolute', bottom: 40, left: 40, right: 40, textAlign: 'center', color: '#a1a1aa', fontSize: 9 }
});

export const ZyloReceipt = ({ order }: ZyloReceiptProps) => {
  const { customerData, items, orderSummary } = order;
  
  // Using 'Rs.' as a safe string for the PDF engine
  const safeSymbol = orderSummary.symbol === '₨' ? 'Rs.' : orderSummary.symbol;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header - Text Only */}
        <View style={styles.header}>
          <Text style={styles.brand}>ZYLO</Text>
          <View style={{ textAlign: 'right' }}>
            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>INVOICE</Text>
            <Text>Order #{orderSummary.orderNumber}</Text>
          </View>
        </View>

        {/* Info Grid */}
        <View style={styles.grid}>
          <View style={styles.col}>
            <Text style={styles.sectionTitle}>Customer Details</Text>
            <Text style={styles.infoText}>{customerData.firstName} {customerData.lastName}</Text>
            <Text style={styles.infoText}>{customerData.email}</Text>
            <Text style={styles.infoText}>{customerData.phone}</Text>
            <Text style={styles.infoText}>Payment: {customerData.payment_method}</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.sectionTitle}>Shipping Address</Text>
            <Text style={styles.infoText}>{customerData.address}</Text>
            <Text style={styles.infoText}>{customerData.city}, {customerData.zip}</Text>
            <Text style={styles.infoText}>{customerData.country}</Text>
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.tableHeader}>
          <Text style={[styles.colDesc, { paddingLeft: 5 }]}>Product Name</Text>
          <Text style={styles.colQty}>Qty</Text>
          <Text style={styles.colPrice}>Price</Text>
        </View>

        {items.map((item, i) => (
          <View key={i} style={styles.tableRow}>
            <View style={styles.colDesc}>
              <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
              <Text style={{ fontSize: 8, color: '#71717a', marginTop: 2 }}>
                Size: {item.productSize} | ID: {item.id}
              </Text>
            </View>
            <Text style={styles.colQty}>{item.itemCartQuantity}</Text>
            <Text style={styles.colPrice}>
               {safeSymbol} {item.price.toLocaleString()}
            </Text>
          </View>
        ))}

        {/* Totals */}
        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={{ color: '#71717a' }}>Subtotal:</Text>
            <Text>{safeSymbol} {orderSummary.subTotal.toLocaleString()}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={{ color: '#71717a' }}>Shipping Fee:</Text>
            <Text>{safeSymbol} {orderSummary.shippingAmount.toLocaleString()}</Text>
          </View>
          <View style={[styles.totalRow, styles.grandTotal]}>
            <Text>Total Paid:</Text>
            <Text>{safeSymbol} {orderSummary.totalAmount.toLocaleString()}</Text>
          </View>
        </View>

        <Text style={styles.footer}>
          Thank you for choosing Zylo Streetwear. This is a computer-generated receipt. 
          For any inquiries contact us at brandzylo@gmail.com
        </Text>
      </Page>
    </Document>
  );
};