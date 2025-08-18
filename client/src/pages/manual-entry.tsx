import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { z } from "zod";
import { Header } from "@/components/header";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Save, ArrowLeft, Edit3 } from "lucide-react";
import { formatNaira, parseAmount } from "@/lib/currency";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Form validation schema
const expenseSchema = z.object({
  merchant: z.string().min(1, "Merchant name is required"),
  categoryId: z.string().min(1, "Please select a category"),
  amount: z.string().min(1, "Amount is required").refine(
    (val) => {
      const cleanVal = val.replace(/[₦,\s]/g, '');
      return parseFloat(cleanVal) > 0;
    },
    "Amount must be greater than 0"
  ),
  date: z.string().min(1, "Date is required"),
  notes: z.string().optional()
});

const itemSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  price: z.string().min(1, "Price is required").refine(
    (val) => parseAmount(val) > 0,
    "Price must be greater than 0"
  )
});

interface ExpenseItem {
  name: string;
  quantity: number;
  price: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export default function ManualEntry() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [items, setItems] = useState<ExpenseItem[]>([
    { name: "", quantity: 1, price: "" }
  ]);
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handle input focus to prevent keyboard blocking
  useEffect(() => {
    const handleInputFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        setTimeout(() => {
          target.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
          });
        }, 300); // Delay to allow keyboard to appear
      }
    };

    document.addEventListener('focusin', handleInputFocus);
    return () => document.removeEventListener('focusin', handleInputFocus);
  }, []);

  // Fetch categories
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['/api/categories']
  });

  // Form setup
  const form = useForm({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      merchant: "",
      categoryId: "",
      amount: "",
      date: new Date().toISOString().split('T')[0], // Today's date
      notes: ""
    }
  });

  // Create expense mutation
  const createExpenseMutation = useMutation({
    mutationFn: async (expenseData: any) => {
      const response = await apiRequest('/api/expenses', 'POST', expenseData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard/stats'] });
      queryClient.invalidateQueries({ queryKey: ['/api/expenses'] });
      toast({
        title: "Success!",
        description: "Manual expense entry saved successfully"
      });
      // Reset form and items
      form.reset();
      setItems([{ name: "", quantity: 1, price: "" }]);
      // Navigate back to dashboard
      setLocation('/');
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save expense entry",
        variant: "destructive"
      });
    }
  });

  // Add new item row
  const addItem = () => {
    setItems([...items, { name: "", quantity: 1, price: "" }]);
  };

  // Remove item row
  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  // Update item field
  const updateItem = (index: number, field: keyof ExpenseItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  // Calculate total from items
  const calculateItemsTotal = () => {
    return items.reduce((total, item) => {
      if (item.name && item.price) {
        const itemPrice = parseAmount(item.price);
        return total + (itemPrice * item.quantity);
      }
      return total;
    }, 0);
  };

  // Auto-calculate amount when items change
  useEffect(() => {
    const itemsTotal = calculateItemsTotal();
    if (itemsTotal > 0) {
      form.setValue('amount', formatNaira(itemsTotal));
    }
  }, [items, form]);

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof expenseSchema>) => {
    // Filter out empty items
    const validItems = items.filter(item => item.name && item.price);
    
    // Find the selected category name
    const selectedCategory = categories.find(cat => cat.id === data.categoryId);
    
    const expenseData = {
      merchant: data.merchant,
      category: selectedCategory?.name || "Uncategorized",
      amount: parseAmount(data.amount).toString(),
      date: data.date, // Send as date string - backend will convert it
      notes: data.notes || "",
      items: validItems.map(item => 
        `${item.name} (Qty: ${item.quantity}, Price: ${item.price})`
      )
    };

    await createExpenseMutation.mutateAsync(expenseData);
  };

  return (
    <div className="w-full max-w-none md:max-w-4xl lg:max-w-6xl mx-auto bg-background min-h-screen">
      <Header title="Manual Entry" />
      
      <main className="pb-24 px-4 py-4" style={{ minHeight: '100vh' }}>
        <div className="max-w-2xl mx-auto">


          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="merchant"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Merchant Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Shoprite, GTBank, Uber, etc."
                            {...field}
                            data-testid="input-merchant"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-category">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                  <div className="flex items-center gap-2">
                                    <span>{category.icon}</span>
                                    <span>{category.name}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <Input 
                              type="date"
                              {...field}
                              data-testid="input-date"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Amount (₦)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="0"
                            value={field.value}
                            onChange={(e) => {
                              // Simply store the raw input, no formatting during typing
                              field.onChange(e.target.value);
                            }}
                            onBlur={(e) => {
                              // Format only when user leaves the field
                              const value = e.target.value.replace(/[^\d.]/g, '');
                              if (value && parseFloat(value) > 0) {
                                field.onChange(formatNaira(parseFloat(value)));
                              } else if (!value) {
                                field.onChange('');
                              }
                            }}
                            onFocus={(e) => {
                              // Remove formatting when user focuses to allow easy editing
                              const value = parseAmount(e.target.value);
                              if (value > 0) {
                                field.onChange(value.toString());
                              }
                            }}
                            data-testid="input-amount"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Add any additional notes about this expense..."
                            {...field}
                            data-testid="textarea-notes"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Items Details */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">Item Details (Optional)</CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addItem}
                    data-testid="button-add-item"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Item
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                        <Input
                          placeholder="Item name"
                          value={item.name}
                          onChange={(e) => updateItem(index, 'name', e.target.value)}
                          data-testid={`input-item-name-${index}`}
                        />
                        <div className="grid grid-cols-2 gap-1">
                          <Input
                            type="number"
                            placeholder="Qty"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
                            data-testid={`input-item-quantity-${index}`}
                          />
                          <Input
                            placeholder="₦Price"
                            value={item.price}
                            onChange={(e) => {
                              // Store raw input during typing
                              updateItem(index, 'price', e.target.value);
                            }}
                            onBlur={(e) => {
                              // Format when user leaves the field
                              const value = e.target.value.replace(/[^\d.]/g, '');
                              if (value && parseFloat(value) > 0) {
                                updateItem(index, 'price', formatNaira(parseFloat(value)));
                              } else if (!value) {
                                updateItem(index, 'price', '');
                              }
                            }}
                            onFocus={(e) => {
                              // Remove formatting when user focuses
                              const value = parseAmount(e.target.value);
                              if (value > 0) {
                                updateItem(index, 'price', value.toString());
                              }
                            }}
                            data-testid={`input-item-price-${index}`}
                          />
                        </div>
                      </div>
                      {items.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeItem(index)}
                          className="text-destructive hover:text-destructive"
                          data-testid={`button-remove-item-${index}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  
                  {calculateItemsTotal() > 0 && (
                    <div className="pt-2 border-t">
                      <div className="flex justify-between text-sm">
                        <span>Calculated Total:</span>
                        <span className="font-semibold">₦{calculateItemsTotal().toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setLocation('/')}
                  data-testid="button-cancel"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={createExpenseMutation.isPending}
                  data-testid="button-save-expense"
                >
                  {createExpenseMutation.isPending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Expense
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
}