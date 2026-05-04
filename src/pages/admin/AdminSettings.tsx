import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, MapPin, Globe, Instagram, Facebook, MessageCircle } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';

const AdminSettings = () => {
  return (
    <AdminLayout title="Settings" description="Manage your store settings and contact information.">
      <div className="grid gap-6 max-w-4xl">
        <div className="backdrop-blur-sm border rounded-xl p-6" style={{
          background: 'hsl(var(--card))',
          borderColor: 'hsl(var(--border))'
        }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'hsl(var(--foreground))' }}>Business Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" style={{ color: 'hsl(var(--foreground))' }}>Business Name</label>
              <Input defaultValue="Hungarian Bites" style={{
                background: 'hsl(var(--input))',
                borderColor: 'hsl(var(--border))',
                color: 'hsl(var(--foreground))'
              }} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" style={{ color: 'hsl(var(--foreground))' }}>Business Email</label>
              <Input defaultValue="kennedygikonyo3@gmail.com" type="email" style={{
                background: 'hsl(var(--input))',
                borderColor: 'hsl(var(--border))',
                color: 'hsl(var(--foreground))'
              }} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" style={{ color: 'hsl(var(--foreground))' }}>Phone Number</label>
              <Input defaultValue="+254 (0) 759 233 065" type="tel" style={{
                background: 'hsl(var(--input))',
                borderColor: 'hsl(var(--border))',
                color: 'hsl(var(--foreground))'
              }} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" style={{ color: 'hsl(var(--foreground))' }}>Location</label>
              <Input defaultValue="Murang'a, Kenya" style={{
                background: 'hsl(var(--input))',
                borderColor: 'hsl(var(--border))',
                color: 'hsl(var(--foreground))'
              }} />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button style={{ background: 'var(--gradient-primary)' }}>Save Changes</Button>
          </div>
        </div>

        <Separator />

        <div className="backdrop-blur-sm border rounded-xl p-6" style={{
          background: 'hsl(var(--card))',
          borderColor: 'hsl(var(--border))'
        }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'hsl(var(--foreground))' }}>Social Media Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2" style={{ color: 'hsl(var(--foreground))' }}>
                <Instagram className="w-4 h-4" /> Instagram
              </label>
              <Input defaultValue="https://www.instagram.com/vdj_kenydee/" placeholder="Instagram URL" style={{
                background: 'hsl(var(--input))',
                borderColor: 'hsl(var(--border))',
                color: 'hsl(var(--foreground))'
              }} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2" style={{ color: 'hsl(var(--foreground))' }}>
                <Facebook className="w-4 h-4" /> Facebook
              </label>
              <Input defaultValue="https://facebook.com/hungarianbites" placeholder="Facebook URL" style={{
                background: 'hsl(var(--input))',
                borderColor: 'hsl(var(--border))',
                color: 'hsl(var(--foreground))'
              }} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2" style={{ color: 'hsl(var(--foreground))' }}>
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </label>
              <Input defaultValue="https://wa.me/254700123456" placeholder="WhatsApp URL" style={{
                background: 'hsl(var(--input))',
                borderColor: 'hsl(var(--border))',
                color: 'hsl(var(--foreground))'
              }} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2" style={{ color: 'hsl(var(--foreground))' }}>
                <Globe className="w-4 h-4" /> Website
              </label>
              <Input defaultValue="https://hungarianbites.co.ke" placeholder="Website URL" style={{
                background: 'hsl(var(--input))',
                borderColor: 'hsl(var(--border))',
                color: 'hsl(var(--foreground))'
              }} />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button style={{ background: 'var(--gradient-primary)' }}>Save Changes</Button>
          </div>
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
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>Email notifications</p>
                <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Receive email alerts for new orders</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>Low stock alerts</p>
                <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Get notified when inventory drops below 20 units</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
