# Phase 1 Passes Backup

When you are ready to launch Phase 1 and re-introduce the Couple and Group passes, here is the code you will need to add back.

## 1. frontend/components/PassCards.tsx

In `passes` array, add these back:

```typescript
    {
      id: 'Couple',
      name: 'Couple Pass',
      tagline: 'Entry for 2 Baaratis',
      price: 899,
      originalPrice: 1199,
      popular: true,
      benefits: [
        'Entry for 2 People (Couple / Duo)',
        'VIP Red Carpet Welcome & Photo Booth Access',
        'Full Multi-Course Royal Banquet Dinner for 2',
        'Front-Row Stage Access & Couple Dance Floor',
        'Eligible for Best Dressed Couple Awards',
        'Digital QR E-Passes for Both Members'
      ]
    },
    {
      id: 'Group',
      name: 'Group Pass (4 People)',
      tagline: 'Squad Entry for 4 Friends',
      price: 1599,
      originalPrice: 1999,
      popular: false,
      benefits: [
        'Entry for 4 Friends in a Single Pass',
        'Reserved Squad Table & Welcome Drinks',
        'Full Multi-Course Royal Banquet Dinner for 4',
        'Complimentary Souvenir Photo Frame',
        'Exclusive Squad Dance Floor Access',
        'Digital QR E-Passes for All 4 Members'
      ]
    }
```

Make sure to restore the grid class in `PassCards.tsx` to: `className="grid grid-cols-1 md:grid-cols-3 gap-8"`
Also, ensure the pass cards wrapper `div` uses the updated class `className="box-gold-frame [&::before]:rounded-[20px] rounded-3xl ..."` to keep the beautifully curved inner dotted border without the L-corners!
And restore the benefits rendering logic in `PassCards.tsx` if you want to show the lists again.

## 2. frontend/components/RegistrationForm.tsx

In the Pass Type Selector, add these back:

```typescript
            {[
              { label: 'Early Bird Pass', value: 'Single Pass', price: '₹499' },
              { label: 'Couple Pass', value: 'Couple Pass', price: '₹899' },
              { label: 'Group Pass (4 People)', value: 'Group Pass (4 People)', price: '₹1599' }
            ].map((p) => (
              // ... button rendering logic
```

Make sure to restore the grid class for the buttons to: `className="grid grid-cols-1 sm:grid-cols-3 gap-3"`
