# Numbering Issue Analysis

## Problem
The Six Steps and 17 Critical Points sections show all items as "1." instead of sequential numbers (1, 2, 3, etc.)

## Root Cause
Looking at the screenshot, I can see the issue. The content in the data file has numbered items like:
- "1. Cultivate Empathy"
- "1. Address Obstacle Emotions"  
- "1. Get Treatment for Both Partners"

Each main item starts with "1." in the source data, and the sub-items are bullet points.

The renderContent function correctly parses these as numbered list items, but since each main step starts with "1." in the source, they all render as "1."

## Solution
Need to update the data file to use proper sequential numbering in the content strings.
