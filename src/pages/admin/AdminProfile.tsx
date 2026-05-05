import React, { useState, useRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAdminProfile } from '@/context/AdminProfileContext';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Camera, Save, Upload, X, Loader2 } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { toast } from 'sonner';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  bio: z.string().max(200, 'Bio must be less than 200 characters').optional(),
  role: z.string().min(2, 'Role is required'),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const AdminProfile = () => {
  const navigate = useNavigate();
  const { profile, updateProfile, updateAvatar, removeAvatar, isLoading } = useAdminProfile();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(profile.avatar || null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      bio: profile.bio,
      role: profile.role,
    },
  });

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    try {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      await updateAvatar(file);
      toast.success('Profile picture updated successfully');
    } catch (error) {
      toast.error('Failed to update profile picture');
      setAvatarPreview(profile.avatar || null);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveAvatar = () => {
    removeAvatar();
    setAvatarPreview(null);
    toast.success('Profile picture removed');
  };

  const onSubmit = (data: ProfileFormValues) => {
    updateProfile(data);
    toast.success('Profile updated successfully');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <AdminLayout title="Profile" description="View and edit your admin profile.">
      <div className="grid gap-6 max-w-4xl">
        <div className="backdrop-blur-sm border rounded-xl p-6" style={{
          background: 'hsl(var(--card))',
          borderColor: 'hsl(var(--border))'
        }}>
          <h3 className="text-lg font-semibold mb-6" style={{ color: 'hsl(var(--foreground))' }}>
            Profile Picture
          </h3>

          <div className="flex items-center gap-6">
            <div className="relative group">
              <Avatar className="h-24 w-24 cursor-pointer" onClick={handleAvatarClick}>
                <AvatarImage src={avatarPreview || profile.avatar} alt={profile.name} />
                <AvatarFallback className="text-lg" style={{
                  background: 'var(--gradient-primary)',
                  color: 'white'
                }}>
                  {getInitials(profile.name)}
                </AvatarFallback>
              </Avatar>

              <div
                className="absolute inset-0 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                style={{ background: 'rgba(0,0,0,0.5)' }}
                onClick={handleAvatarClick}
              >
                {isUploading ? (
                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                ) : (
                  <Camera className="w-6 h-6 text-white" />
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                aria-label="Upload profile picture"
              />
            </div>

            <div className="flex-1">
              <p className="text-sm mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Upload a new profile picture. Recommended size: 300x300px, max 5MB.
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAvatarClick}
                  disabled={isUploading}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
                {(avatarPreview || profile.avatar) && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleRemoveAvatar}
                    style={{ color: 'hsl(var(--destructive))' }}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="backdrop-blur-sm border rounded-xl p-6" style={{
          background: 'hsl(var(--card))',
          borderColor: 'hsl(var(--border))'
        }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'hsl(var(--foreground))' }}>
            Profile Information
          </h3>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} style={{
                          background: 'hsl(var(--input))',
                          borderColor: 'hsl(var(--border))',
                          color: 'hsl(var(--foreground))'
                        }} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" style={{
                          background: 'hsl(var(--input))',
                          borderColor: 'hsl(var(--border))',
                          color: 'hsl(var(--foreground))'
                        }} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} type="tel" style={{
                          background: 'hsl(var(--input))',
                          borderColor: 'hsl(var(--border))',
                          color: 'hsl(var(--foreground))'
                        }} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Input {...field} style={{
                          background: 'hsl(var(--input))',
                          borderColor: 'hsl(var(--border))',
                          color: 'hsl(var(--foreground))'
                        }} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={3}
                        maxLength={200}
                        style={{
                          background: 'hsl(var(--input))',
                          borderColor: 'hsl(var(--border))',
                          color: 'hsl(var(--foreground))'
                        }}
                      />
                    </FormControl>
                    <div className="flex justify-between">
                      <FormMessage />
                      <span className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        {field.value?.length || 0}/200
                      </span>
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={isLoading || !form.formState.isDirty}
                  style={{ background: 'var(--gradient-primary)' }}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </div>

        <Separator />

        <div className="backdrop-blur-sm border rounded-xl p-6" style={{
          background: 'hsl(var(--card))',
          borderColor: 'hsl(var(--border))'
        }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'hsl(var(--foreground))' }}>
            Account Information
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span style={{ color: 'hsl(var(--muted-foreground))' }}>Last Updated</span>
              <span style={{ color: 'hsl(var(--foreground))' }}>
                {profile.updatedAt
                  ? new Date(profile.updatedAt).toLocaleString()
                  : 'Never'}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: 'hsl(var(--muted-foreground))' }}>Account Role</span>
              <span className="px-2 py-1 rounded text-xs" style={{
                background: 'hsl(var(--primary) / 0.1)',
                color: 'hsl(var(--primary))'
              }}>
                {profile.role}
              </span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;
