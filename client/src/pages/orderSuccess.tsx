import { Button } from "@/components/ui/button";
import { NavigationBar } from "@/components/reusable/Navigation";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "@/store/slices/cartSlice";
import { toast } from "sonner";
import { Tooltip } from "@/components/ui/tooltip";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Truck, Banknote } from "lucide-react";
import { ZyloReceipt } from "@/components/reusable/ReceiptDownload";
import { PDFDownloadLink } from "@react-pdf/renderer";

export function OrderConfirmation() {
  const location = useLocation();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  // Accessing the data passed from the checkout page
  const orderDetails = location.state?.order;
  //   Copy to clipboard functionality
  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch (error) {
      console.log("Failed to copy code!", error);
    }
  };


  useEffect(() => {
    if (!orderDetails) {
      navigation("/");
      return;
    }
    // Clearing the cart after we navigate to this page
    dispatch(clearCart());
  }, []);
  if (!orderDetails) return null;

  return (
    <div className="min-h-screen bg-muted/5">
      <NavigationBar />
      <main className="max-w-4xl mx-auto px-4 md:px-20 py-32 md:py-40">
        {/* Header Section */}
        <div className="flex flex-col text-center space-y-2  pb-4">
          <h1 className="text-center text-h3 text-main font-medium uppercase tracking-wide pb-4">
            <span>Thank you,</span>{" "}
            <span className="font-bold">
              {orderDetails.customerData.firstName}{" "}
              {orderDetails.customerData.lastName}
            </span>
          </h1>
          <h2 className="text-base tracking-wide  text-muted">
            Your order has been received and is getting processed.
          </h2>
          <div className="p-4">
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={"default"}
                    onClick={() =>
                      copyText(orderDetails.orderSummary.orderNumber)
                    }
                    className="shadow-2xl p-6 hover:bg-primary/80 transition-all duration-300"
                  >
                    <span className="text-card text-base font-normal tracking-normal px-2 py-4">
                      Order Id :{" "}
                    </span>
                    <span className="text-base text-white font-bold">
                      {orderDetails.orderSummary.orderNumber}
                    </span>
                  </Button>
                </TooltipTrigger>

                <TooltipContent
                  side="bottom"
                  sideOffset={10}
                  className="bg-card text-main border-2 px-4 py-2 rounded-full shadow-xl animate-in fade-in zoom-in duration-100"
                >
                  <p className="text-xs font-bold uppercase tracking-tighter flex items-center gap-2">
                    Click to copy ID
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div id="zylo-receipt-download" className="px-4 mt-8 border rounded overflow-hidden bg-card shadow-sm">
          <Accordion type="single" defaultValue="Order Details" collapsible>
            {/* Order Details */}
            <AccordionItem value="Order Details">
              <AccordionTrigger className="text-[16px] font-bold uppercase tracking-widest ">
                Order Details
              </AccordionTrigger>
              <AccordionContent>
                {/* Product Details Table */}
                <div className="relative border rounded-lg overflow-hidden flex flex-col max-h-[500px]">
                  <div className="overflow-y-auto flex-grow">
                    
                    <Table>
                        {/* Table items */}
                      <TableHeader className="sticky top-0 z-10 shadow-sm">
                        <TableRow className="hover:bg-transparent">
                          {/* 1. Adjusted width to 50% instead of a fixed 600px to prevent overflow on smaller screens */}
                          <TableHead className="w-1/2 px-6 py-5 text-menu font-bold uppercase">
                            Product Details
                          </TableHead>

                          <TableHead className="px-4 py-5 text-menu font-bold uppercase">
                            Size
                          </TableHead>

                          <TableHead className="px-6 py-5 text-menu font-bold uppercase text-center">
                            Quantity
                          </TableHead>

                          <TableHead className="px-6 py-5 text-menu font-bold uppercase text-right">
                            Amount
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                    {/* Main Table Body */}
                      <TableBody>
                        {orderDetails.items.map((item: any) => (
                          <TableRow
                            key={item.id}
                            className="hover:bg-null transition-colors border-b border-muted last:border-0 "
                          >
                            <TableCell className="py-6">
                              <div className="flex items-center gap-6">
                                <div className="relative h-32 w-24 flex-shrink-0 overflow-hidden rounded-sm bg-[#f9f9f9] border border-gray-100">
                                  <img
                                    src={item.primaryImage}
                                    alt={item.title}
                                    className="h-full w-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-500"
                                  />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <span className="text-main text-product-title tracking-wide uppercase font-medium">
                                    {item.title}
                                  </span>
                                </div>
                              </div>
                            </TableCell>

                            <TableCell className="text-center">
                              <span className="text-main text-product-title tracking-wide uppercase font-medium">
                                {item.productSize}
                              </span>
                            </TableCell>

                            <TableCell className="text-center">
                              <span className="text-main text-product-title tracking-wide uppercase font-medium">
                                {item.itemCartQuantity}
                              </span>
                            </TableCell>
                            <TableCell className="text-center">
                              <span className="text-main text-product-title tracking-wide uppercase font-medium">
                                {orderDetails.orderSummary.symbol}{" "}
                                {item.itemCartQuantity * item.price}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      {/* Amount  */}
                      <TableFooter className="bg-transparent border-t-2 border-main">
                        {/* Subtotal Row */}
                        <TableRow className="hover:bg-transparent border-none">
                          <TableCell
                            colSpan={3}
                            className="py-2 font-medium text-main/45 text-product-title"
                          >
                            Subtotal
                          </TableCell>
                          <TableCell className="text-right py-2 font-medium text-main/45 text-product-title">
                            {orderDetails.orderSummary.symbol}{" "}
                            {orderDetails.orderSummary.subTotal?.toLocaleString()}
                          </TableCell>
                        </TableRow>

                        {/* Delivery Row */}
                        <TableRow className="hover:bg-transparent border-none">
                          <TableCell
                            colSpan={3}
                            className="py-2 font-medium text-main/45 text-product-title"
                          >
                            Shipping & Handling
                          </TableCell>
                          <TableCell className="text-right py-2 font-medium text-main/45 text-product-title">
                            {orderDetails.orderSummary.symbol} {" "}
                            {orderDetails.orderSummary.shippingAmount}
                          </TableCell>
                        </TableRow>
                        {/* Total Row */}
                        <TableRow className="hover:bg-transparent border-t border-gray-100">
                          <TableCell
                            colSpan={3}
                            className="py-6 text-[18px] uppercase font-bold tracking-widest"
                          >
                            Total Amount Paid
                          </TableCell>
                          <TableCell className="text-right py-6 text-[18px] uppercase font-bold tracking-widest">
                            {orderDetails.orderSummary.symbol}{" "}
                            {orderDetails.orderSummary.totalAmount.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            {/* Delivery Details */}
            <AccordionItem value="Delivery Details">
              <AccordionTrigger className="text-[16px] font-bold uppercase tracking-widest">
                Delivery Details
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  p-8">
                  <div className="p-2 md:border-r border-muted ">
                    <div className="flex flex-row items-center gap-2">
                      <Truck size={20} />
                      <h1 className="font-bold text-base uppercase">
                        Shipping to:
                      </h1>
                    </div>
                    <div className="flex flex-col text-base tracking-wider gap-2 text-start mt-4">
                      <h1 className="flex gap-2 ">
                        Name:
                        <span>
                          {orderDetails.customerData.firstName}
                          {""} {orderDetails.customerData.lastName}{" "}
                        </span>
                      </h1>
                      <h1 className="flex gap-2">
                        Contact:<span>{orderDetails.customerData.phone}</span>
                      </h1>
                      <h1 className="flex gap-2">
                        Country:<span>{orderDetails.customerData.country}</span>
                      </h1>
                      <h1 className="flex gap-2">
                        City:<span>{orderDetails.customerData.city}</span>
                      </h1>
                      <h1 className="flex gap-2">
                        Address:<span>{orderDetails.customerData.address}</span>
                      </h1>
                      <h1 className="flex gap-2">
                        Zip Code:<span>{orderDetails.customerData.zip}</span>
                      </h1>
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end mt-4 md:mt-0 p-2">
                    <div className="flex flex-row items-center gap-2">
                      <Banknote size={20} />
                      <h1 className="font-bold text-base uppercase">
                        Payment Method:
                      </h1>
                    </div>
                    <div className="mt-4 text-base tracking-wider">
                      <span>{orderDetails.customerData.payment_method}</span>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        {/* End CTA's */}
        <div className="flex flex-col items-center md:flex-row lg:flex-row md:justify-center mt-6"> 
           
            <PDFDownloadLink
              document={<ZyloReceipt 
                order={orderDetails}
              />}
              fileName={`Zylo_Order_${orderDetails.orderSummary.orderNumber}.pdf`}
            >
              <Button
              variant="ghost"
              className="rounded-none text-main text-button underline underline-offset-4"
            >
              Download Receipt
            </Button> 
            </PDFDownloadLink>
          <Link to="/">
            <Button
              variant="ghost"
              className="rounded-none text-main text-button underline underline-offset-4"
            >
              Continue Shopping
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
