import { Button } from "@/components/ui/button";
import { NavigationBar } from "@/components/reusable/Navigation";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "@/store/slices/cartSlice";
import { toast } from "sonner";
import { Tooltip } from "@/components/ui/tooltip";
import { fetchOrderDetails } from "@/api/authService";
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

import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Truck, Banknote, Copy, InfoIcon } from "lucide-react";
import { ZyloReceipt } from "@/components/reusable/ReceiptDownload";
import { PDFDownloadLink } from "@react-pdf/renderer";

export function OrderConfirmation() {
  // Fetching the token from the param
  const { token } = useParams<{ token: string }>();
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const [orderDetails, setOrderDetails] = useState<any>(null);

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
    const fetchDetails = async () => {
      try {

        // Fetching the orderToken from the api 
        const response = await fetchOrderDetails(token!);
        if (response.success) {
          setOrderDetails(response.order);
        }
      } catch (error) {
        toast.error("Could not find any order records. Please try again!");
        navigation("/");
      }
    };
    if (token) {
      fetchDetails();
    }
    // Clearing the cart after we navigate to this page
    dispatch(clearCart());
  }, [token, navigation, dispatch]);
  if (!orderDetails) return null;

  return (
    <div className="min-h-screen bg-background">
      <NavigationBar />
      <main className="max-w-4xl mx-auto px-4 md:px-12 py-24 md:py-32 border-r border-l border-primary/20 bg-gradient-to-b from-neutral-50/30 to-transparent dark:from-neutral-900/10 shadow-xl shadow-primary/5">
        {/* Header Section */}
        <div className="flex flex-col text-center space-y-6 pb-8 max-w-xl mx-auto">
          {/* Header Section */}
          <div className="space-y-3">
            <h1 className="text-center text-h3 text-main font-medium tracking-wide">
              <span>Thank you,</span>{" "}
              <span className="font-bold">
                {orderDetails.customerData.firstName} {orderDetails.customerData.lastName}.
              </span>
            </h1>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-1">
              <h2 className="text-paragraph tracking-wide text-main/70">
                We have received your order and it is being processed.
              </h2>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 font-mono font-bold text-main tracking-tighter shadow-sm">
                #{orderDetails.orderNumber}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-3.5 flex gap-2 items-center bg-neutral-50/60 dark:bg-neutral-900/40 border border-neutral-200/60 dark:border-neutral-800/60 rounded-xl shadow-sm transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-700">
              <div className="relative flex-1 overflow-hidden">
                <Input
                  readOnly
                  value={window.location.href}
                  className="bg-transparent border-0 shadow-none font-mono text-paragraph text-primary/70 select-all pr-6 focus-visible:ring-0 truncate cursor-default"
                />
              </div>

              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      onClick={() => copyText(window.location.href)}
                      size="icon"
                      className="h-9 w-9 text-primary hover:text-white hover:bg-primary transition-all duration-200 active:scale-95 rounded-lg shadow-sm shrink-0"
                    >
                      <Copy className="h-4 w-4" strokeWidth={1.75} />
                    </Button>
                  </TooltipTrigger>

                  <TooltipContent
                    side="top"
                    sideOffset={8}
                    className="bg-black text-white dark:bg-white dark:text-black border-0 text-[10px] font-medium tracking-widest uppercase px-3 py-1.5 rounded-md shadow-md animate-in fade-in slide-in-from-bottom-1 duration-150"
                  >
                    Copy Link
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="bg-amber-50/40 dark:bg-amber-950/10 p-3.5 rounded-xl border border-amber-200/40 dark:border-amber-900/20 shadow-sm transition-all duration-300">
              <div className="flex gap-3 items-start text-left">
                <InfoIcon className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-500 mt-0.5" />
                <p className="text-nav text-main/80 leading-relaxed">
                  <span className="font-bold uppercase tracking-wider text-[10px] bg-amber-600/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 px-1.5 py-0.5 rounded mr-1.5">
                    Important
                  </span>
                  This receipt will vanish once you close this tab. Make sure to copy and save the link above to review your order details anytime in the future.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          id="zylo-receipt-download"
          className="px-6 py-2 mt-8 border border-neutral-200 dark:border-neutral-800 rounded-xl bg-card/40 backdrop-blur-md shadow-md"
        >
          <Accordion type="multiple" defaultValue={["Order Details"]}>
            {/* Order Details */}
            <AccordionItem value="Order Details" className="border-none">
              <AccordionTrigger className="text-[14px] font-bold uppercase tracking-widest text-main hover:no-underline py-5">
                Order Details 
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-6">
                {/* Product Details Table */}
                <div className="relative border border-neutral-200/80 dark:border-neutral-800 rounded-xl overflow-hidden flex flex-col max-h-[500px] bg-background/50">
                  <div className="overflow-y-auto flex-grow">
                    <Table>
                      {/* Table items */}
                      <TableHeader className="sticky top-0延 z-10 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 shadow-sm">
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="w-1/2 px-6 py-4 text-menu font-bold uppercase tracking-wider text-main/80">
                            Product Details
                          </TableHead>
                          <TableHead className="px-4 py-4 text-menu font-bold uppercase tracking-wider text-center text-main/80">
                            Size
                          </TableHead>
                          <TableHead className="px-4 py-4 text-menu font-bold uppercase tracking-wider text-center text-main/80">
                            Color
                          </TableHead>
                          <TableHead className="px-6 py-4 text-menu font-bold uppercase tracking-wider text-center text-main/80">
                            Quantity
                          </TableHead>
                          <TableHead className="px-6 py-4 text-menu font-bold uppercase tracking-wider text-right text-main/80">
                            Amount
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      {/* Main Table Body */}
                      <TableBody>
                        {orderDetails.items.map((item: any) => (
                          <TableRow
                            key={item.id}
                            className="hover:bg-neutral-50/40 dark:hover:bg-neutral-900/40 transition-colors border-b border-neutral-100 dark:border-neutral-800/60 last:border-0"
                          >
                            <TableCell className="py-5 px-6">
                              <div className="flex items-center gap-5">
                                <div className="relative h-24 w-18 flex-shrink-0 overflow-hidden rounded border border-neutral-200/60 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                                  <img
                                    src={item.primaryImage}
                                    alt={item.title}
                                    className="h-full w-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-500"
                                  />
                                </div>
                                <div className="flex flex-col gap-1">
                                  <span className="text-main text-product-title tracking-wide uppercase font-semibold">
                                    {item.title}
                                  </span>
                                </div>
                              </div>
                            </TableCell>

                            <TableCell className="text-center">
                              <span className="text-main/80 text-product-title tracking-wide uppercase font-medium bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
                                {item.productSize}
                              </span>
                            </TableCell>

                            <TableCell className="text-center">
                              <span className="text-main/80 text-product-title tracking-wide uppercase font-medium">
                                {item.productColor}
                              </span>
                            </TableCell>

                            <TableCell className="text-center font-mono text-main/80 font-medium">
                              {item.itemCartQuantity}
                            </TableCell>

                            <TableCell className="text-right px-6 font-mono font-semibold text-main">
                              {orderDetails.orderSummary.symbol}{" "}
                              {(item.itemCartQuantity * item.price).toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                      {/* Amount  */}
                      <TableFooter className="bg-neutral-50/50 dark:bg-neutral-900/30 border-t border-neutral-200 dark:border-neutral-800">
                        {/* Subtotal Row */}
                        <TableRow className="hover:bg-transparent border-none">
                          <TableCell
                            colSpan={4}
                            className="py-3 px-6 font-medium text-main/60 text-product-title uppercase tracking-wider"
                          >
                            Subtotal
                          </TableCell>
                          <TableCell className="text-right px-6 py-3 font-mono font-medium text-main/80">
                            {orderDetails.orderSummary.symbol}{" "}
                            {orderDetails.orderSummary.subTotal?.toLocaleString()}
                          </TableCell>
                        </TableRow>

                        {/* Delivery Row */}
                        <TableRow className="hover:bg-transparent border-none">
                          <TableCell
                            colSpan={4}
                            className="py-3 px-6 font-medium text-main/60 text-product-title uppercase tracking-wider"
                          >
                            Shipping & Handling
                          </TableCell>
                          <TableCell className="text-right px-6 py-3 font-mono font-medium text-main/80">
                            {orderDetails.orderSummary.symbol}{" "}
                            {orderDetails.orderSummary.shippingAmount}
                          </TableCell>
                        </TableRow>
                        {/* Total Row */}
                        <TableRow className="hover:bg-transparent border-t border-neutral-200 dark:border-neutral-800">
                          <TableCell
                            colSpan={4}
                            className="py-5 px-6 text-[15px] uppercase font-bold tracking-widest text-main"
                          >
                            Total Amount Paid
                          </TableCell>
                          <TableCell className="text-right px-6 py-5 text-[15px] font-mono font-bold tracking-tight text-primary">
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
            <AccordionItem value="Delivery Details" className="border-none">
              <AccordionTrigger className="text-[14px] font-bold uppercase tracking-widest text-main hover:no-underline py-5">
                Delivery Details
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-background/40 border border-neutral-200/60 dark:border-neutral-800 rounded-xl">
                  <div className="space-y-4 md:border-r border-neutral-200 dark:border-neutral-800/80 md:pr-8">
                    <div className="flex flex-row items-center gap-2 text-main">
                      <Truck size={18} strokeWidth={2} />
                      <h1 className="font-bold text-sm uppercase tracking-wider">
                        Shipping to:
                      </h1>
                    </div>
                    <div className="space-y-2.5 text-sm tracking-wide text-main/80 mt-4">
                      <h1 className="flex justify-between border-b border-neutral-100 dark:border-neutral-900 pb-1.5">
                        <span className="text-neutral-400 font-medium">Name:</span>
                        <span className="font-semibold text-main">
                          {orderDetails.customerData.firstName} {orderDetails.customerData.lastName}
                        </span>
                      </h1>
                      <h1 className="flex justify-between border-b border-neutral-100 dark:border-neutral-900 pb-1.5">
                        <span className="text-neutral-400 font-medium">Contact:</span>
                        <span className="font-mono">{orderDetails.customerData.phone}</span>
                      </h1>
                      <h1 className="flex justify-between border-b border-neutral-100 dark:border-neutral-900 pb-1.5">
                        <span className="text-neutral-400 font-medium">Country:</span>
                        <span>{orderDetails.customerData.country}</span>
                      </h1>
                      <h1 className="flex justify-between border-b border-neutral-100 dark:border-neutral-900 pb-1.5">
                        <span className="text-neutral-400 font-medium">City:</span>
                        <span>{orderDetails.customerData.city}</span>
                      </h1>
                      <h1 className="flex justify-between border-b border-neutral-100 dark:border-neutral-900 pb-1.5">
                        <span className="text-neutral-400 font-medium">Address:</span>
                        <span>{orderDetails.customerData.address}</span>
                      </h1>
                      <h1 className="flex justify-between pb-1">
                        <span className="text-neutral-400 font-medium">Zip Code:</span>
                        <span className="font-mono">{orderDetails.customerData.zip}</span>
                      </h1>
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end justify-between p-2">
                    <div className="w-full space-y-4 md:text-right">
                      <div className="flex flex-row items-center md:justify-end gap-2 text-main">
                        <Banknote size={18} strokeWidth={2} />
                        <h1 className="font-bold text-sm uppercase tracking-wider">
                          Payment Method:
                        </h1>
                      </div>
                      <div className="mt-4 text-sm font-semibold tracking-wider text-main bg-neutral-100 dark:bg-neutral-800 md:inline-block px-3 py-1.5 rounded-md border border-neutral-200/40 dark:border-neutral-700/60">
                        <span>{orderDetails.customerData.payment_method}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        {/* End CTA's */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10">
          <PDFDownloadLink
            document={<ZyloReceipt order={orderDetails} />}
            fileName={`${orderDetails.orderNumber}.pdf`}
            className="w-full sm:w-auto"
          >
            <Button
              variant="ghost"
              className="w-full sm:w-auto rounded-none text-main hover:text-primary uppercase text-button underline underline-offset-4 tracking-wider transition-colors duration-200"
            >
              Download Receipt
            </Button>
          </PDFDownloadLink>
          <Link to="/collections/shop-all" className="w-full sm:w-auto">
            <Button
              variant="ghost"
              className="w-full sm:w-auto rounded-none text-main text-button uppercase hover:text-primary underline underline-offset-4 tracking-wider transition-colors duration-200"
            >
              continue shopping
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
