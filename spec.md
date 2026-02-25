# Specification

## Summary
**Goal:** Add a pricing configuration flow to TradeBuddy so the app owner can set an affordable price before publishing the app live to the App Market.

**Planned changes:**
- Add a pricing configuration screen or modal accessible from the "Go Live" / publish flow
- Include predefined affordable pricing tiers (Free, $0.99, $1.99, $4.99) plus a manual price input supporting USD
- Display the selected price in a confirmation step before completing the go-live action
- Validate that the price input is a non-negative numeric value
- Support dark/light mode consistent with the existing TradeBuddy design system
- Add `setAppPrice` and `getAppPrice` methods to the backend actor (`backend/main.mo`)
- Store the configured price in stable storage so it persists across canister upgrades

**User-visible outcome:** When initiating the go-live flow, the app owner can choose or enter an affordable price, review it in a confirmation step, and save it — with the price persisting across sessions.
