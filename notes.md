# 📌 Last action

- 🟢 Implemented the `BetList` component to render bets with their corresponding legs.

---

# ✅ TODO (high-level tasks)

- [ ] Build the **Combo Bet Form** with dynamic leg management.
- [ ] Add an optional `note` field to each bet.
- [ ] Display the `netResult` when a bet is settled (`won` or `lost`).
- [ ] Create a **Bet History page** to list all bets.
- [ ] Add global **Zod validation** for all API routes.
- [ ] Create a reusable `validateWith(schema)` middleware for Express.
- [ ] Refactor logic into `bankroll.service.ts` and `bets.service.ts`.

---

# 🔄 Quick History

- ✅ Integrated `lowdb` to persist bankroll and bets.
- ✅ Added unique `id` for each `bet` and `leg`.
- ✅ Used TanStack Form with `mode: 'array'` for dynamic legs input.
- ✅ Displayed detailed bet data in a list using a nested `.map()` structure.
