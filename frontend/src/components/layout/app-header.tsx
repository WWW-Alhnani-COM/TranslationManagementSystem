"use client"
import { useState } from "react"
import { Bell, Search, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Link from "next/link"

export function AppHeader() {
  const [notificationCount] = useState(3)
  return (
    <header className="h-16 border-b border-border bg-background flex items-center justify-between px-6">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search projects, translations..." className="pl-10" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs"
                >
                  {notificationCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Notifications</h3>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/notifications">View all</Link>
                </Button>
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                  <p className="text-sm font-medium text-foreground">Translation Approved</p>
                  <p className="text-xs text-muted-foreground mt-1">Your translation has been approved</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                  <p className="text-sm font-medium text-foreground">New Comment</p>
                  <p className="text-xs text-muted-foreground mt-1">Sarah commented on your review</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                  <p className="text-sm font-medium text-foreground">Project Updated</p>
                  <p className="text-xs text-muted-foreground mt-1">New paragraphs added to project</p>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/settings">
            <Settings className="w-5 h-5" />
          </Link>
        </Button>
      </div>
    </header>
  )
}