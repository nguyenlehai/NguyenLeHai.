## Explain Code
These changes make the code:
- More type-safe with TypeScript
- Clearer and more understandable logic
- More performant
- More resilient against runtime errors
### 1. Adding Type Definition
```typescript
type BlockchainType = "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo";
```
- Instead of using `any` for blockchain, we define a specific union type
- This helps TypeScript catch errors if incorrect blockchain values are passed
- Added `blockchain: BlockchainType` to the `WalletBalance` interface to ensure type safety

### 2. Refactoring Filter and Sort Logic
#### Old code:
```typescript
.filter((balance: WalletBalance) => {
  const balancePriority = getPriority(balance.blockchain);
  if (lhsPriority > -99) {
    if (balance.amount <= 0) {
      return true;
    }
  }
  return false
})
```

#### New code:
```typescript
.filter((balance: WalletBalance) => {
  const balancePriority = getPriority(balance.blockchain);
  return balancePriority > -99 && balance.amount > 0;
})
```

Key improvements:
- Old logic seemed inverted (keeping balances <= 0)
- Simplified conditions for better readability
- Only keep balances with valid priority (> -99) and amount > 0

### 3. Optimizing Sort

#### Old code:
```typescript
.sort((lhs, rhs) => {
  const leftPriority = getPriority(lhs.blockchain);
  const rightPriority = getPriority(rhs.blockchain);
  if (leftPriority > rightPriority) return -1;
  else if (rightPriority > leftPriority) return 1;
})
```

#### New code:
```
.sort((lhs, rhs) => 
  getPriority(rhs.blockchain) - getPriority(lhs.blockchain)
)
```

Benefits:
- Simplified using subtraction, gives equivalent results
- More readable and concise
- Achieves the same sorting behavior with less code

### 4. Removing formattedBalances
- Previously created a new array containing formatted amounts
- Now formatting directly in `rows` using `balance.amount.toFixed()`
- Avoids unnecessary intermediate array creation

### 5. Adding Null Safety
```typescript
const usdValue = (prices[balance.currency] ?? 0) * balance.amount;
```
- Using nullish coalescing operator (??)
- If `prices[balance.currency]` is null/undefined, defaults to 0
- Prevents errors when currency price is not available

### 6. Optimizing Dependencies
```typescript
}, [balances]); // Remove unnecessary deps
```
- `prices` doesn't affect sorting/filtering
- Removed prices from dependencies to avoid unnecessary re-renders
### 7. Clean code
#### Old code:
```typescript
const getPriority = (blockchain: any): number => {
  switch (blockchain) {
    case 'Osmosis':
      return 100
    case 'Ethereum':
      return 50
    case 'Arbitrum':
      return 30
    case 'Zilliqa':
      return 20
    case 'Neo':
      return 20
    default:
      return -99
  }
}
```

#### New code:
```
  // Define a blockchains
  const blockchains = {
    Osmosis: 100,
    Ethereum: 50,
    Arbitrum: 30,
    Zilliqa: 20,
    Neo: 20,
  }
  const getPriority = (blockchain: string): number => blockchains[blockchain] || -99;
```
