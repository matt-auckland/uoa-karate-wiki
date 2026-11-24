---
title: Kata
categories:
  - Kata

isCategoryParent: true
kataList:
  - file: gekisai-dai-ichi
    type: Kaishugata
  - file: gekisai-dai-ni
    type: Kaishugata
  - file: saifa
    type: Kaishugata
  - file: seiyunchin
    type: Kaishugata
  - file: shisochin
    type: Kaishugata
  - file: sanseiru
    type: Kaishugata
  - file: seipai
    type: Kaishugata
  - file: kururunfa
    type: Kaishugata
  - file: seisan
    type: Kaishugata
  - file: suparinpei
    type: Kaishugata
  - file: sanchin
    type: Heishugata
    variant: Higashionna
    suffix: （東恩納）
    anchor: '#how-to-higaonna-style'
  - file: sanchin
    type: Heishugata
    variant: Miyagi
    suffix: （宮城）
    anchor: '#how-to-miyagi-style'
  - file: tensho
    type: Heishugata
---

# Kata

## What is a Kata?

A Kata (also know as: a form or a pattern) is a set of movements and techniques performed in a prescribed sequence and manner of execution. Kata serve as a 'library' of useful techniques, stances, and movements. These sequences can be taken apart and analysed (a method known in Japanese as 'Bunkai' <ruby><rb>分</rb><rt>ぶん</rt><rb>解</rb><rt>かい</rt></ruby>) to discover self-defense applications (known as 'Oyo' in Japanese <ruby><rb>応</rb><rt>おう</rt><rb>用</rb><rt>よう</rt></ruby>). These applications could contain anything from simple evade-and-counter combos, joint locking techniques, throws and takedowns, escapes from wrist and clothing grabs and more.

In Japanese, 'Kata' generally refers to a method of doing something or a sequence of movements. It can be written in a few different ways but the most common when referring to a 'Karate Kata' are 「方」, 「形」 or 「型」.

## Goju Ryu Kata List

<script setup>
import { RouteLink, usePageData } from 'vuepress/client'

const page = usePageData()
</script>

<table>
  <thead>
    <tr><th>Name</th><th>Kanji</th><th>First taught at</th><th>Required for grading</th><th>Type</th></tr>
  </thead>
  <tbody>
    <tr v-for="kata in page.kataRows" :key="kata.path">
      <td><RouteLink :to="kata.path">{{ kata.name }}</RouteLink></td>
      <td>{{ kata.kanji }}</td>
      <td>{{ kata.firstTaught }}</td>
      <td>{{ kata.requiredFor }}</td>
      <td><a :href="'#' + kata.type.toLowerCase()">{{ kata.type }}</a></td>
    </tr>
  </tbody>
</table>

## Kata Types

Kata are classed into two broad categories **Heishugata** and **Kaishugata**

### Heishugata

Literally Closed Kata. These can be considered basic or fundamental kata, primarily focused on body mechanics such as breathing, stepping, and general muscular control. They also teach some basic striking and blocking mechanics. Sanchin and Tensho are the only heishugata.

### Kaishugata

Literally "Open Kata". These can be considered to be more advanced kata where the practicioner is introduced to a variety of movements and attacking/defending techniques. This includes every kata other than Sanchin and Tensho.
## Tips

Record a video of yourself doing the kata, you'll definitely find things you can improve by watching the video.
### Common mistakes in kata to watch out for

- Short-cutting techniques. i.e. not fully completing a technique before starting the next
- Stances too short/too long
- Incorrect angles. Angles become quite common in kata starting from Seiyunchin, and an incorrect angle in one portion of the kata can mess up all the rest
- Rushing the kata. It's quite important that you take the time to complete each technique before starting the next. Forcing yourself to pause and completely stop your movement for a second or two can be a good way to ensure you aren't rushing anything.

### Memorizing a kata

- Practise it a lot
- Perform it slowly, pause after each technique for a second
- Start facing in different directions than usual when practising
- Train it in different places
- Start from different points in the kata, e.g. 5 moves in, after a particular sequence of techniques finishes, be creative
