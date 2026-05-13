import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Globe, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  getAdminSettings,
  saveAdminSettings,
  getAdminPreferences,
  saveAdminPreference,
  type AdminPreferences
} from '@/data/orders';

const businessSchema = z.object({
  businessName: z.string().min(2, 'Business name is required'),
  businessEmail: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 characters'),
  location: z.string().min(2, 'Location is required'),
});

const socialSchema = z.object({
  instagram: z.string().url('Invalid URL').or(z.literal('')),
  facebook: z.string().url('Invalid URL').or(z.literal('')),
  whatsapp: z.string().url('Invalid URL').or(z.literal('')),
  website: z.string().url('Invalid URL').or(z.literal('')),
});

const AdminSettings = () => {
  const settings = getAdminSettings();
  const preferences = getAdminPreferences();

  const [prefs, setPrefs] = useState<AdminPreferences>(preferences);

  const businessForm = useForm<z.infer<typeof businessSchema>>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      businessName: settings.businessName,
      businessEmail: settings.businessEmail,
      phoneNumber: settings.phoneNumber,
      location: settings.location,
    },
  });

  const socialForm = useForm<z.infer<typeof socialSchema>>({
    resolver: zodResolver(socialSchema),
    defaultValues: {
      instagram: settings.instagram,
      facebook: settings.facebook,
      whatsapp: settings.whatsapp,
      website: settings.website,
    },
  });

  const onSaveBusiness = (data: z.infer<typeof businessSchema>) => {
    saveAdminSettings(data);
    toast.success('Business information saved successfully');
  };

  const onSaveSocial = (data: z.infer<typeof socialSchema>) => {
    saveAdminSettings(data);
    toast.success('Social media links saved successfully');
  };

  const togglePreference = (key: keyof AdminPreferences) => {
    const newVal = !prefs[key];
    setPrefs(prev => ({ ...prev, [key]: newVal }));
    saveAdminPreference(key, newVal);
    toast.success(`${key === 'autoAcceptOrders' ? 'Auto-accept' : key === 'emailNotifications' ? 'Email notifications' : 'Low stock alerts'} ${newVal ? 'enabled' : 'disabled'}`);
  };

  return (
    <AdminLayout title="Settings" description="Manage your store settings and contact information.">
      <div className="grid gap-6 max-w-4xl">
        <div className="backdrop-blur-sm border rounded-xl p-6" style={{
          background: 'hsl(var(--card))',
          borderColor: 'hsl(var(--border))'
        }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'hsl(var(--foreground))' }}>Business Information</h3>
          <Form {...businessForm}>
            <form onSubmit={businessForm.handleSubmit(onSaveBusiness)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={businessForm.control} name="businessName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl><Input {...field} style={{ background: 'hsl(var(--input))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={businessForm.control} name="businessEmail" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Email</FormLabel>
                    <FormControl><Input {...field} type="email" style={{ background: 'hsl(var(--input))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={businessForm.control} name="phoneNumber" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl><Input {...field} type="tel" style={{ background: 'hsl(var(--input))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={businessForm.control} name="location" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl><Input {...field} style={{ background: 'hsl(var(--input))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={!businessForm.formState.isDirty} style={{ background: 'var(--gradient-primary)' }}>Save Changes</Button>
              </div>
            </form>
          </Form>
        </div>

        <Separator />

        <div className="backdrop-blur-sm border rounded-xl p-6" style={{
          background: 'hsl(var(--card))',
          borderColor: 'hsl(var(--border))'
        }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'hsl(var(--foreground))' }}>Social Media Links</h3>
          <Form {...socialForm}>
            <form onSubmit={socialForm.handleSubmit(onSaveSocial)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={socialForm.control} name="instagram" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Instagram className="w-4 h-4" /> Instagram</FormLabel>
                    <FormControl><Input {...field} placeholder="Instagram URL" style={{ background: 'hsl(var(--input))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={socialForm.control} name="facebook" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Facebook className="w-4 h-4" /> Facebook</FormLabel>
                    <FormControl><Input {...field} placeholder="Facebook URL" style={{ background: 'hsl(var(--input))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={socialForm.control} name="whatsapp" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><MessageCircle className="w-4 h-4" /> WhatsApp</FormLabel>
                    <FormControl><Input {...field} placeholder="WhatsApp URL" style={{ background: 'hsl(var(--input))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={socialForm.control} name="website" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><Globe className="w-4 h-4" /> Website</FormLabel>
                    <FormControl><Input {...field} placeholder="Website URL" style={{ background: 'hsl(var(--input))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={!socialForm.formState.isDirty} style={{ background: 'var(--gradient-primary)' }}>Save Changes</Button>
              </div>
            </form>
          </Form>
        </div>

        <Separator />

        <div className="backdrop-blur-sm border rounded-xl p-6" style={{
          background: 'hsl(var(--card))',
          borderColor: 'hsl(var(--border))'
        }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'hsl(var(--foreground))' }}>Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>Auto-accept orders</p>
                <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Automatically confirm all incoming orders</p>
              </div>
              <Switch checked={prefs.autoAcceptOrders} onCheckedChange={() => togglePreference('autoAcceptOrders')} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>Email notifications</p>
                <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Receive email alerts for new orders</p>
              </div>
              <Switch checked={prefs.emailNotifications} onCheckedChange={() => togglePreference('emailNotifications')} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>Low stock alerts</p>
                <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Get notified when inventory drops below 20 units</p>
              </div>
              <Switch checked={prefs.lowStockAlerts} onCheckedChange={() => togglePreference('lowStockAlerts')} />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
