'use client'

import * as React from 'react'
import { Check, ChevronDown, Search, X } from 'lucide-react'
import * as PopoverPrimitive from '@radix-ui/react-popover'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

export interface SearchableSelectOption {
  value: string
  label: string
  description?: string
  icon?: React.ReactNode
}

interface SearchableSelectProps {
  options: SearchableSelectOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  disabled?: boolean
  size?: 'sm' | 'default'
  className?: string
  emptyMessage?: string
  /** Optional: max height of the dropdown content (default: 320px) */
  maxHeight?: string
}

const SearchableSelect = React.forwardRef<HTMLDivElement, SearchableSelectProps>(
  (
    {
      options,
      value,
      onValueChange,
      placeholder = 'Select option...',
      searchPlaceholder = 'Search...',
      disabled = false,
      size = 'default',
      className,
      emptyMessage = 'No results found.',
      maxHeight = '320px', // ← this is the key fix + configurable
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false)
    const [searchTerm, setSearchTerm] = React.useState('')

    const filteredOptions = React.useMemo(() => {
      if (!searchTerm) return options
      const lower = searchTerm.toLowerCase()
      return options.filter(
        (opt) =>
          opt.label.toLowerCase().includes(lower) ||
          opt.description?.toLowerCase().includes(lower)
      )
    }, [options, searchTerm])

    const selectedOption = options.find((opt) => opt.value === value)

    const handleSelect = (optionValue: string) => {
      onValueChange?.(optionValue)
      setOpen(false)
      setSearchTerm('')
    }

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation()
      onValueChange?.('')
      setSearchTerm('')
      // Keep popover open if user wants to select something else
    }

    return (
      <div ref={ref} className={cn('w-full', className)}>
        <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
          {/* Trigger */}
          <PopoverPrimitive.Trigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              disabled={disabled}
              className={cn(
                'w-full justify-between text-left font-normal',
                !value && 'text-muted-foreground',
                size === 'sm' ? 'h-9 px-3 text-sm' : 'h-10 px-3',
                'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              )}
            >
              <span className="truncate flex-1">
                {selectedOption ? selectedOption.label : placeholder}
              </span>

              <div className="ml-2 flex items-center gap-1 shrink-0">
                {value && !disabled && (
                  <X
                    className="h-4 w-4 opacity-70 hover:opacity-100 transition-opacity"
                    onClick={handleClear}
                  />
                )}
                <ChevronDown
                  className={cn(
                    'h-4 w-4 opacity-50 transition-transform duration-200',
                    open && 'rotate-180'
                  )}
                />
              </div>
            </Button>
          </PopoverPrimitive.Trigger>

          {/* Content */}
          <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
              align="start"
              sideOffset={6}
              avoidCollisions={true}
              className={cn(
                'z-50 w-[var(--radix-popover-trigger-width)] max-w-[var(--radix-popover-trigger-width)]',
                'rounded-lg border bg-popover text-popover-foreground shadow-xl',
                'data-[state=open]:animate-in data-[state=closed]:animate-out',
                'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95'
              )}
            >
              {/* Sticky search header */}
              <div className="sticky top-0 z-10 bg-popover border-b px-3 pt-3 pb-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                  <Input
                    placeholder={searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-9 pl-9 pr-4"
                    autoFocus
                  />
                </div>
              </div>

              {/* Scrollable options */}
              <ScrollArea className="p-1.5" style={{ maxHeight }}>
                {filteredOptions.length === 0 ? (
                  <div className="py-8 text-center text-sm text-muted-foreground">
                    {emptyMessage}
                  </div>
                ) : (
                  <div className="space-y-0.5">
                    {filteredOptions.map((option) => {
                      const isSelected = value === option.value
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleSelect(option.value)}
                          className={cn(
                            'relative flex w-full cursor-default select-none items-center rounded-sm px-3 py-2 text-sm outline-none',
                            'transition-colors hover:bg-accent hover:text-accent-foreground',
                            isSelected && 'bg-accent text-accent-foreground',
                            'focus:bg-accent focus:text-accent-foreground'
                          )}
                        >
                          <div className="flex items-center gap-2.5 flex-1 min-w-0">
                            {option.icon && (
                              <span className="shrink-0 text-muted-foreground/80">
                                {option.icon}
                              </span>
                            )}

                            <div className="min-w-0 flex-1">
                              <div className="truncate leading-tight">
                                {option.label}
                              </div>
                              {option.description && (
                                <div className="text-xs text-muted-foreground truncate mt-0.5">
                                  {option.description}
                                </div>
                              )}
                            </div>
                          </div>

                          {isSelected && (
                            <Check className="h-4 w-4 text-primary ml-2 shrink-0" />
                          )}
                        </button>
                      )
                    })}
                  </div>
                )}
              </ScrollArea>
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>
      </div>
    )
  }
)

SearchableSelect.displayName = 'SearchableSelect'

export { SearchableSelect }