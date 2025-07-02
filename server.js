const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Complete enhanced morpheme database with IPA and phonemic classification
const phonemeDatabase = {
  // Vowels
  'ɪ': { symbol: 'ɪ', ipa: 'ɪ', type: 'vowel', articulatory: { place: 'front', manner: 'close' }, frequency: 10.74 },
  'ɛ': { symbol: 'ɛ', ipa: 'ɛ', type: 'vowel', articulatory: { place: 'front', manner: 'mid' }, frequency: 8.33 },
  'æ': { symbol: 'æ', ipa: 'æ', type: 'vowel', articulatory: { place: 'front', manner: 'open' }, frequency: 5.13 },
  'ə': { symbol: 'ə', ipa: 'ə', type: 'vowel', articulatory: { place: 'central', manner: 'mid' }, frequency: 18.46 },
  'ʌ': { symbol: 'ʌ', ipa: 'ʌ', type: 'vowel', articulatory: { place: 'central', manner: 'mid' }, frequency: 2.97 },
  'ɑ': { symbol: 'ɑ', ipa: 'ɑ', type: 'vowel', articulatory: { place: 'back', manner: 'open' }, frequency: 4.32 },
  'ɔ': { symbol: 'ɔ', ipa: 'ɔ', type: 'vowel', articulatory: { place: 'back', manner: 'mid' }, frequency: 2.15 },
  'ʊ': { symbol: 'ʊ', ipa: 'ʊ', type: 'vowel', articulatory: { place: 'back', manner: 'close' }, frequency: 1.88 },
  'u': { symbol: 'u', ipa: 'u', type: 'vowel', articulatory: { place: 'back', manner: 'close' }, frequency: 1.75 },
  'i': { symbol: 'i', ipa: 'i', type: 'vowel', articulatory: { place: 'front', manner: 'close' }, frequency: 6.97 },
  
  // Consonants - Stops
  'p': { symbol: 'p', ipa: 'p', type: 'consonant', articulatory: { place: 'bilabial', manner: 'stop', voicing: 'voiceless' }, frequency: 1.93 },
  'b': { symbol: 'b', ipa: 'b', type: 'consonant', articulatory: { place: 'bilabial', manner: 'stop', voicing: 'voiced' }, frequency: 1.29 },
  't': { symbol: 't', ipa: 't', type: 'consonant', articulatory: { place: 'alveolar', manner: 'stop', voicing: 'voiceless' }, frequency: 9.06 },
  'd': { symbol: 'd', ipa: 'd', type: 'consonant', articulatory: { place: 'alveolar', manner: 'stop', voicing: 'voiced' }, frequency: 4.25 },
  'k': { symbol: 'k', ipa: 'k', type: 'consonant', articulatory: { place: 'velar', manner: 'stop', voicing: 'voiceless' }, frequency: 3.22 },
  'g': { symbol: 'g', ipa: 'g', type: 'consonant', articulatory: { place: 'velar', manner: 'stop', voicing: 'voiced' }, frequency: 2.02 },
  
  // Consonants - Fricatives
  'f': { symbol: 'f', ipa: 'f', type: 'consonant', articulatory: { place: 'labiodental', manner: 'fricative', voicing: 'voiceless' }, frequency: 2.23 },
  'v': { symbol: 'v', ipa: 'v', type: 'consonant', articulatory: { place: 'labiodental', manner: 'fricative', voicing: 'voiced' }, frequency: 0.98 },
  'θ': { symbol: 'θ', ipa: 'θ', type: 'consonant', articulatory: { place: 'dental', manner: 'fricative', voicing: 'voiceless' }, frequency: 0.31 },
  'ð': { symbol: 'ð', ipa: 'ð', type: 'consonant', articulatory: { place: 'dental', manner: 'fricative', voicing: 'voiced' }, frequency: 1.75 },
  's': { symbol: 's', ipa: 's', type: 'consonant', articulatory: { place: 'alveolar', manner: 'fricative', voicing: 'voiceless' }, frequency: 6.33 },
  'z': { symbol: 'z', ipa: 'z', type: 'consonant', articulatory: { place: 'alveolar', manner: 'fricative', voicing: 'voiced' }, frequency: 0.74 },
  'ʃ': { symbol: 'ʃ', ipa: 'ʃ', type: 'consonant', articulatory: { place: 'postalveolar', manner: 'fricative', voicing: 'voiceless' }, frequency: 0.63 },
  'ʒ': { symbol: 'ʒ', ipa: 'ʒ', type: 'consonant', articulatory: { place: 'postalveolar', manner: 'fricative', voicing: 'voiced' }, frequency: 0.06 },
  'h': { symbol: 'h', ipa: 'h', type: 'consonant', articulatory: { place: 'glottal', manner: 'fricative', voicing: 'voiceless' }, frequency: 6.09 },
  
  // Consonants - Affricates
  'tʃ': { symbol: 'tʃ', ipa: 'tʃ', type: 'consonant', articulatory: { place: 'postalveolar', manner: 'affricate', voicing: 'voiceless' }, frequency: 0.26 },
  'dʒ': { symbol: 'dʒ', ipa: 'dʒ', type: 'consonant', articulatory: { place: 'postalveolar', manner: 'affricate', voicing: 'voiced' }, frequency: 0.16 },
  
  // Consonants - Nasals
  'm': { symbol: 'm', ipa: 'm', type: 'consonant', articulatory: { place: 'bilabial', manner: 'nasal', voicing: 'voiced' }, frequency: 2.41 },
  'n': { symbol: 'n', ipa: 'n', type: 'consonant', articulatory: { place: 'alveolar', manner: 'nasal', voicing: 'voiced' }, frequency: 6.95 },
  'ŋ': { symbol: 'ŋ', ipa: 'ŋ', type: 'consonant', articulatory: { place: 'velar', manner: 'nasal', voicing: 'voiced' }, frequency: 0.73 },
  
  // Consonants - Liquids
  'l': { symbol: 'l', ipa: 'l', type: 'consonant', articulatory: { place: 'alveolar', manner: 'lateral', voicing: 'voiced' }, frequency: 4.03 },
  'r': { symbol: 'r', ipa: 'r', type: 'consonant', articulatory: { place: 'postalveolar', manner: 'approximant', voicing: 'voiced' }, frequency: 5.99 },
  
  // Consonants - Glides
  'w': { symbol: 'w', ipa: 'w', type: 'consonant', articulatory: { place: 'labial-velar', manner: 'approximant', voicing: 'voiced' }, frequency: 2.36 },
  'j': { symbol: 'j', ipa: 'j', type: 'consonant', articulatory: { place: 'palatal', manner: 'approximant', voicing: 'voiced' }, frequency: 0.15 },
  
  // Diphthongs
  'aɪ': { symbol: 'aɪ', ipa: 'aɪ', type: 'diphthong', frequency: 1.85 },
  'aʊ': { symbol: 'aʊ', ipa: 'aʊ', type: 'diphthong', frequency: 0.88 },
  'ɔɪ': { symbol: 'ɔɪ', ipa: 'ɔɪ', type: 'diphthong', frequency: 0.23 },
  'eɪ': { symbol: 'eɪ', ipa: 'eɪ', type: 'diphthong', frequency: 1.13 },
  'oʊ': { symbol: 'oʊ', ipa: 'oʊ', type: 'diphthong', frequency: 1.04 }
};

const enhancedMorphemeDatabase = {
  // Length 1 - Primordial Axis (Enhanced with IPA)
  'a': { 
    meaning: 'absence/without', 
    category: 'state', 
    weight: 1, 
    origin: 'greek',
    ipa: 'ə',
    phonemes: ['ə'],
    alternateSpellings: ['an-'] 
  },
  'i': { 
    meaning: 'self/interior', 
    category: 'identity', 
    weight: 1, 
    origin: 'latin',
    ipa: 'ɪ',
    phonemes: ['ɪ'] 
  },
  'e': { 
    meaning: 'out/emission', 
    category: 'direction', 
    weight: 1, 
    origin: 'latin',
    ipa: 'i',
    phonemes: ['i'],
    alternateSpellings: ['ex-', 'ef-'] 
  },
  'o': { 
    meaning: 'object/output', 
    category: 'form', 
    weight: 1, 
    origin: 'latin',
    ipa: 'oʊ',
    phonemes: ['oʊ'] 
  },
  
  // Length 2 - Binary Functional Layer
  'an': { 
    meaning: 'not/without', 
    category: 'negation', 
    weight: 2, 
    origin: 'greek',
    ipa: 'æn',
    phonemes: ['æ', 'n'],
    alternateSpellings: ['a-'] 
  },
  'co': { 
    meaning: 'with/together', 
    category: 'union', 
    weight: 2, 
    origin: 'latin',
    ipa: 'koʊ',
    phonemes: ['k', 'oʊ'],
    alternateSpellings: ['com-', 'con-', 'col-', 'cor-'] 
  },
  'in': { 
    meaning: 'in/into/not', 
    category: 'direction/negation', 
    weight: 2, 
    origin: 'latin',
    ipa: 'ɪn',
    phonemes: ['ɪ', 'n'],
    alternateSpellings: ['im-', 'il-', 'ir-'] 
  },
  'ex': { 
    meaning: 'out/from', 
    category: 'direction', 
    weight: 2, 
    origin: 'latin',
    ipa: 'ɛks',
    phonemes: ['ɛ', 'k', 's'],
    alternateSpellings: ['e-', 'ef-'] 
  },
  'sy': { 
    meaning: 'together/synchronized', 
    category: 'union', 
    weight: 2, 
    origin: 'greek',
    ipa: 'sɪ',
    phonemes: ['s', 'ɪ'],
    alternateSpellings: ['syn-', 'sym-'] 
  },
  're': { 
    meaning: 'again/back', 
    category: 'repetition', 
    weight: 2, 
    origin: 'latin',
    ipa: 'ri',
    phonemes: ['r', 'i'],
    alternateSpellings: ['red-'] 
  },
  'de': { 
    meaning: 'down/undo', 
    category: 'reversal', 
    weight: 2, 
    origin: 'latin',
    ipa: 'di',
    phonemes: ['d', 'i'],
    alternateSpellings: ['des-'] 
  },
  'un': { 
    meaning: 'not', 
    category: 'negation', 
    weight: 2, 
    origin: 'english',
    ipa: 'ʌn',
    phonemes: ['ʌ', 'n'] 
  },
  'bi': { 
    meaning: 'two', 
    category: 'quantity', 
    weight: 2, 
    origin: 'latin',
    ipa: 'baɪ',
    phonemes: ['b', 'aɪ'],
    alternateSpellings: ['bin-'] 
  },
  'di': { 
    meaning: 'two/apart', 
    category: 'quantity', 
    weight: 2, 
    origin: 'greek',
    ipa: 'daɪ',
    phonemes: ['d', 'aɪ'],
    alternateSpellings: ['dif-', 'dis-'] 
  },

  // Length 3 - Ternary Classifier Layer
  'con': { 
    meaning: 'with/together', 
    category: 'union', 
    weight: 3, 
    origin: 'latin',
    ipa: 'kɑn',
    phonemes: ['k', 'ɑ', 'n'],
    alternateSpellings: ['com-', 'co-', 'col-', 'cor-'] 
  },
  'sub': { 
    meaning: 'under/below', 
    category: 'position', 
    weight: 3, 
    origin: 'latin',
    ipa: 'sʌb',
    phonemes: ['s', 'ʌ', 'b'],
    alternateSpellings: ['suc-', 'suf-', 'sup-', 'sur-', 'sus-'] 
  },
  'pre': { 
    meaning: 'before', 
    category: 'time', 
    weight: 3, 
    origin: 'latin',
    ipa: 'pri',
    phonemes: ['p', 'r', 'i'] 
  },
  'per': { 
    meaning: 'through/thoroughly', 
    category: 'completion', 
    weight: 3, 
    origin: 'latin',
    ipa: 'pər',
    phonemes: ['p', 'ər'],
    alternateSpellings: ['pel-'] 
  },
  'pro': { 
    meaning: 'forward/for', 
    category: 'direction', 
    weight: 3, 
    origin: 'latin',
    ipa: 'proʊ',
    phonemes: ['p', 'r', 'oʊ'] 
  },
  'sys': { 
    meaning: 'system/together', 
    category: 'structure', 
    weight: 3, 
    origin: 'greek',
    ipa: 'sɪs',
    phonemes: ['s', 'ɪ', 's'],
    alternateSpellings: ['syn-', 'sym-'] 
  },
  'ant': { 
    meaning: 'against', 
    category: 'opposition', 
    weight: 3, 
    origin: 'greek',
    ipa: 'ænt',
    phonemes: ['æ', 'n', 't'],
    alternateSpellings: ['anti-'] 
  },
  'syn': { 
    meaning: 'together/with', 
    category: 'union', 
    weight: 3, 
    origin: 'greek',
    ipa: 'sɪn',
    phonemes: ['s', 'ɪ', 'n'],
    alternateSpellings: ['sym-', 'sy-', 'syl-'] 
  },
  'sym': { 
    meaning: 'together/with', 
    category: 'union', 
    weight: 3, 
    origin: 'greek',
    ipa: 'sɪm',
    phonemes: ['s', 'ɪ', 'm'],
    alternateSpellings: ['syn-', 'sy-'] 
  },
  'com': { 
    meaning: 'with/together', 
    category: 'union', 
    weight: 3, 
    origin: 'latin',
    ipa: 'kɑm',
    phonemes: ['k', 'ɑ', 'm'],
    alternateSpellings: ['con-', 'co-', 'col-', 'cor-'] 
  },
  'dis': { 
    meaning: 'apart/not', 
    category: 'separation', 
    weight: 3, 
    origin: 'latin',
    ipa: 'dɪs',
    phonemes: ['d', 'ɪ', 's'],
    alternateSpellings: ['dif-', 'di-'] 
  },
  'mis': { 
    meaning: 'wrong/bad', 
    category: 'error', 
    weight: 3, 
    origin: 'english',
    ipa: 'mɪs',
    phonemes: ['m', 'ɪ', 's'] 
  },
  'non': { 
    meaning: 'not', 
    category: 'negation', 
    weight: 3, 
    origin: 'latin',
    ipa: 'nɑn',
    phonemes: ['n', 'ɑ', 'n'] 
  },
  'tri': { 
    meaning: 'three', 
    category: 'quantity', 
    weight: 3, 
    origin: 'latin',
    ipa: 'traɪ',
    phonemes: ['t', 'r', 'aɪ'] 
  },

  // Length 4+ - High-Energy Concept Carriers
  'theo': { 
    meaning: 'god/principle', 
    category: 'universal', 
    weight: 4, 
    origin: 'greek',
    ipa: 'θioʊ',
    phonemes: ['θ', 'i', 'oʊ'],
    alternateSpellings: ['the-'] 
  },
  'tele': { 
    meaning: 'distance/remote', 
    category: 'space', 
    weight: 4, 
    origin: 'greek',
    ipa: 'tɛli',
    phonemes: ['t', 'ɛ', 'l', 'i'],
    alternateSpellings: ['tel-'] 
  },
  'auto': { 
    meaning: 'self', 
    category: 'agency', 
    weight: 4, 
    origin: 'greek',
    ipa: 'ɔtoʊ',
    phonemes: ['ɔ', 't', 'oʊ'] 
  },
  'homo': { 
    meaning: 'same', 
    category: 'identity', 
    weight: 4, 
    origin: 'greek',
    ipa: 'hoʊmoʊ',
    phonemes: ['h', 'oʊ', 'm', 'oʊ'],
    alternateSpellings: ['hom-'] 
  },
  'meta': { 
    meaning: 'beyond/change', 
    category: 'transformation', 
    weight: 4, 
    origin: 'greek',
    ipa: 'mɛtə',
    phonemes: ['m', 'ɛ', 't', 'ə'],
    alternateSpellings: ['met-'] 
  },
  'anti': { 
    meaning: 'against', 
    category: 'opposition', 
    weight: 4, 
    origin: 'greek',
    ipa: 'ænti',
    phonemes: ['æ', 'n', 't', 'i'],
    alternateSpellings: ['ant-'] 
  },
  'para': { 
    meaning: 'beside/beyond', 
    category: 'relation', 
    weight: 4, 
    origin: 'greek',
    ipa: 'pærə',
    phonemes: ['p', 'æ', 'r', 'ə'],
    alternateSpellings: ['par-'] 
  },
  'poly': { 
    meaning: 'many', 
    category: 'quantity', 
    weight: 4, 
    origin: 'greek',
    ipa: 'pɑli',
    phonemes: ['p', 'ɑ', 'l', 'i'] 
  },
  'mono': { 
    meaning: 'one/single', 
    category: 'quantity', 
    weight: 4, 
    origin: 'greek',
    ipa: 'mɑnoʊ',
    phonemes: ['m', 'ɑ', 'n', 'oʊ'] 
  },
  'psych': { 
    meaning: 'mind/soul', 
    category: 'mind', 
    weight: 5, 
    origin: 'greek',
    ipa: 'saɪk',
    phonemes: ['s', 'aɪ', 'k'] 
  },
  'neuro': { 
    meaning: 'nerve/brain', 
    category: 'anatomy', 
    weight: 5, 
    origin: 'greek',
    ipa: 'nʊroʊ',
    phonemes: ['n', 'ʊ', 'r', 'oʊ'] 
  },
  'cyber': { 
    meaning: 'computer/digital', 
    category: 'technology', 
    weight: 5, 
    origin: 'greek',
    ipa: 'saɪbər',
    phonemes: ['s', 'aɪ', 'b', 'ər'] 
  },
  'quantum': { 
    meaning: 'amount/discrete unit', 
    category: 'physics', 
    weight: 6, 
    origin: 'latin',
    ipa: 'kwæntəm',
    phonemes: ['k', 'w', 'æ', 'n', 't', 'ə', 'm'] 
  },
  'nano': { 
    meaning: 'extremely small', 
    category: 'scale', 
    weight: 4, 
    origin: 'greek',
    ipa: 'nænoʊ',
    phonemes: ['n', 'æ', 'n', 'oʊ'] 
  },
  'trans': { 
    meaning: 'across/beyond', 
    category: 'transition', 
    weight: 5, 
    origin: 'latin',
    ipa: 'trænz',
    phonemes: ['t', 'r', 'æ', 'n', 'z'],
    alternateSpellings: ['tra-'] 
  },
  'ultra': { 
    meaning: 'beyond', 
    category: 'excess', 
    weight: 5, 
    origin: 'latin',
    ipa: 'ʌltrə',
    phonemes: ['ʌ', 'l', 't', 'r', 'ə'] 
  },
  'hyper': { 
    meaning: 'over/above', 
    category: 'excess', 
    weight: 5, 
    origin: 'greek',
    ipa: 'haɪpər',
    phonemes: ['h', 'aɪ', 'p', 'ər'] 
  },
  'inter': { 
    meaning: 'between', 
    category: 'relation', 
    weight: 5, 
    origin: 'latin',
    ipa: 'ɪntər',
    phonemes: ['ɪ', 'n', 't', 'ər'] 
  },
  'multi': { 
    meaning: 'many', 
    category: 'quantity', 
    weight: 5, 
    origin: 'latin',
    ipa: 'mʌlti',
    phonemes: ['m', 'ʌ', 'l', 't', 'i'] 
  },
  'crypto': { 
    meaning: 'hidden', 
    category: 'state', 
    weight: 6, 
    origin: 'greek',
    ipa: 'krɪptoʊ',
    phonemes: ['k', 'r', 'ɪ', 'p', 't', 'oʊ'] 
  },
  'bio': { 
    meaning: 'life', 
    category: 'existence', 
    weight: 3, 
    origin: 'greek',
    ipa: 'baɪoʊ',
    phonemes: ['b', 'aɪ', 'oʊ'] 
  },
  'geo': { 
    meaning: 'earth', 
    category: 'space', 
    weight: 3, 
    origin: 'greek',
    ipa: 'dʒioʊ',
    phonemes: ['dʒ', 'i', 'oʊ'] 
  },
  'photo': { 
    meaning: 'light', 
    category: 'energy', 
    weight: 5, 
    origin: 'greek',
    ipa: 'foʊtoʊ',
    phonemes: ['f', 'oʊ', 't', 'oʊ'] 
  },
  'chrono': { 
    meaning: 'time', 
    category: 'time', 
    weight: 6, 
    origin: 'greek',
    ipa: 'kroʊnoʊ',
    phonemes: ['k', 'r', 'oʊ', 'n', 'oʊ'] 
  }
};

// Enhanced root database with phonemic data
const enhancedRootDatabase = {
  'fer': { 
    meaning: 'carry/bring', 
    category: 'action', 
    origin: 'latin',
    ipa: 'fər',
    phonemes: ['f', 'ər'],
    alternateSpellings: ['lat-', 'bear'] 
  },
  'port': { 
    meaning: 'carry', 
    category: 'action', 
    origin: 'latin',
    ipa: 'pɔrt',
    phonemes: ['p', 'ɔ', 'r', 't'] 
  },
  'mit': { 
    meaning: 'send', 
    category: 'action', 
    origin: 'latin',
    ipa: 'mɪt',
    phonemes: ['m', 'ɪ', 't'],
    alternateSpellings: ['miss'] 
  },
  'gress': { 
    meaning: 'step/move', 
    category: 'action', 
    origin: 'latin',
    ipa: 'grɛs',
    phonemes: ['g', 'r', 'ɛ', 's'],
    alternateSpellings: ['grad'] 
  },
  'duct': { 
    meaning: 'lead', 
    category: 'action', 
    origin: 'latin',
    ipa: 'dʌkt',
    phonemes: ['d', 'ʌ', 'k', 't'],
    alternateSpellings: ['duce'] 
  },
  'spec': { 
    meaning: 'look/see', 
    category: 'perception', 
    origin: 'latin',
    ipa: 'spɛk',
    phonemes: ['s', 'p', 'ɛ', 'k'] 
  },
  'vid': { 
    meaning: 'see', 
    category: 'perception', 
    origin: 'latin',
    ipa: 'vɪd',
    phonemes: ['v', 'ɪ', 'd'] 
  },
  'aud': { 
    meaning: 'hear', 
    category: 'perception', 
    origin: 'latin',
    ipa: 'ɔd',
    phonemes: ['ɔ', 'd'] 
  },
  'dic': { 
    meaning: 'speak/say', 
    category: 'communication', 
    origin: 'latin',
    ipa: 'dɪk',
    phonemes: ['d', 'ɪ', 'k'] 
  },
  'log': { 
    meaning: 'speak/study', 
    category: 'communication', 
    origin: 'greek',
    ipa: 'lɔg',
    phonemes: ['l', 'ɔ', 'g'] 
  },
  'graph': { 
    meaning: 'write', 
    category: 'communication', 
    origin: 'greek',
    ipa: 'græf',
    phonemes: ['g', 'r', 'æ', 'f'] 
  },
  'scrib': { 
    meaning: 'write', 
    category: 'communication', 
    origin: 'latin',
    ipa: 'skrɪb',
    phonemes: ['s', 'k', 'r', 'ɪ', 'b'] 
  },
  'form': { 
    meaning: 'shape', 
    category: 'structure', 
    origin: 'latin',
    ipa: 'fɔrm',
    phonemes: ['f', 'ɔ', 'r', 'm'] 
  },
  'struct': { 
    meaning: 'build', 
    category: 'structure', 
    origin: 'latin',
    ipa: 'strʌkt',
    phonemes: ['s', 't', 'r', 'ʌ', 'k', 't'] 
  },
  'gen': { 
    meaning: 'birth/create', 
    category: 'creation', 
    origin: 'latin',
    ipa: 'dʒɛn',
    phonemes: ['dʒ', 'ɛ', 'n'] 
  },
  'crea': { 
    meaning: 'create', 
    category: 'creation', 
    origin: 'latin',
    ipa: 'kriə',
    phonemes: ['k', 'r', 'i', 'ə'] 
  },
  'nat': { 
    meaning: 'birth', 
    category: 'creation', 
    origin: 'latin',
    ipa: 'næt',
    phonemes: ['n', 'æ', 't'] 
  },
  'vita': { 
    meaning: 'life', 
    category: 'existence', 
    origin: 'latin',
    ipa: 'vaɪtə',
    phonemes: ['v', 'aɪ', 't', 'ə'] 
  },
  'mort': { 
    meaning: 'death', 
    category: 'existence', 
    origin: 'latin',
    ipa: 'mɔrt',
    phonemes: ['m', 'ɔ', 'r', 't'] 
  },
  'corp': { 
    meaning: 'body', 
    category: 'anatomy', 
    origin: 'latin',
    ipa: 'kɔrp',
    phonemes: ['k', 'ɔ', 'r', 'p'] 
  },
  'cap': { 
    meaning: 'head', 
    category: 'anatomy', 
    origin: 'latin',
    ipa: 'kæp',
    phonemes: ['k', 'æ', 'p'] 
  },
  'man': { 
    meaning: 'hand', 
    category: 'anatomy', 
    origin: 'latin',
    ipa: 'mæn',
    phonemes: ['m', 'æ', 'n'] 
  },
  'ped': { 
    meaning: 'foot', 
    category: 'anatomy', 
    origin: 'latin',
    ipa: 'pɛd',
    phonemes: ['p', 'ɛ', 'd'] 
  },
  'cord': { 
    meaning: 'heart', 
    category: 'anatomy', 
    origin: 'latin',
    ipa: 'kɔrd',
    phonemes: ['k', 'ɔ', 'r', 'd'] 
  }
};

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Advanced morpheme analysis with linguistic syntax
function analyzeMorphemes(text) {
  const words = text.toLowerCase().split(/\s+/).filter(word => word.length > 0);
  const results = [];
  
  for (const word of words) {
    const morphemes = findMorphemesAdvanced(word);
    if (morphemes.length > 0) {
      results.push({
        word: word,
        morphemes: morphemes,
        hierarchy: buildLinguisticHierarchy(morphemes),
        phonemeAnalysis: analyzePhonemes(morphemes),
        compressionData: calculateCompression(morphemes)
      });
    }
  }
  
  return results;
}

function findMorphemesAdvanced(word) {
  const found = [];
  const allMorphemes = { ...enhancedMorphemeDatabase, ...enhancedRootDatabase };
  
  // Sort by length (longest first) and weight to prioritize complex morphemes
  const sortedMorphemes = Object.keys(allMorphemes).sort((a, b) => {
    if (b.length !== a.length) return b.length - a.length;
    const weightA = allMorphemes[a].weight || 1;
    const weightB = allMorphemes[b].weight || 1;
    return weightB - weightA;
  });
  
  let remainingWord = word;
  let position = 0;
  
  while (remainingWord.length > 0 && position < word.length) {
    let matched = false;
    
    for (const morpheme of sortedMorphemes) {
      if (remainingWord.startsWith(morpheme)) {
        const data = allMorphemes[morpheme];
        found.push({
          morpheme: morpheme,
          data: data,
          position: position,
          length: morpheme.length,
          articulatoryFeatures: data.phonemes ? 
            data.phonemes.map(p => phonemeDatabase[p]).filter(Boolean) : []
        });
        remainingWord = remainingWord.slice(morpheme.length);
        position += morpheme.length;
        matched = true;
        break;
      }
    }
    
    if (!matched) {
      remainingWord = remainingWord.slice(1);
      position++;
    }
  }
  
  return found;
}

function buildLinguisticHierarchy(morphemes) {
  const hierarchy = {
    name: 'root',
    type: 'root',
    children: []
  };
  
  // Create direct morpheme sequence (no grouping by categories)
  for (const item of morphemes) {
    hierarchy.children.push({
      name: item.morpheme,
      displayName: `${item.morpheme} | ${item.data.ipa || ''}`,
      type: 'morpheme',
      meaning: item.data.meaning,
      weight: item.data.weight || 1,
      ipa: item.data.ipa,
      phonemes: item.data.phonemes,
      origin: item.data.origin,
      category: item.data.category,
      position: item.position,
      length: item.length,
      articulatoryFeatures: item.articulatoryFeatures,
      alternateSpellings: item.data.alternateSpellings,
      children: [] // For potential sub-morpheme breakdown
    });
  }
  
  return hierarchy;
}

function analyzePhonemes(morphemes) {
  const phonemeAnalysis = {
    totalPhonemes: 0,
    phoneticComplexity: 0,
    articulatoryDiversity: new Set(),
    voicingDistribution: { voiced: 0, voiceless: 0 },
    mannerDistribution: {},
    placeDistribution: {}
  };
  
  for (const morpheme of morphemes) {
    if (morpheme.data.phonemes) {
      phonemeAnalysis.totalPhonemes += morpheme.data.phonemes.length;
      
      for (const phoneme of morpheme.data.phonemes) {
        const phonemeData = phonemeDatabase[phoneme];
        if (phonemeData) {
          phonemeAnalysis.phoneticComplexity += (1 / phonemeData.frequency) * 100;
          
          if (phonemeData.articulatory) {
            const art = phonemeData.articulatory;
            if (art.place) {
              phonemeAnalysis.articulatoryDiversity.add(art.place);
              phonemeAnalysis.placeDistribution[art.place] = 
                (phonemeAnalysis.placeDistribution[art.place] || 0) + 1;
            }
            if (art.manner) {
              phonemeAnalysis.mannerDistribution[art.manner] = 
                (phonemeAnalysis.mannerDistribution[art.manner] || 0) + 1;
            }
            if (art.voicing) {
              phonemeAnalysis.voicingDistribution[art.voicing]++;
            }
          }
        }
      }
    }
  }
  
  phonemeAnalysis.articulatoryDiversity = phonemeAnalysis.articulatoryDiversity.size;
  return phonemeAnalysis;
}

function calculateCompression(morphemes) {
  const compressionData = {
    morphemeCount: morphemes.length,
    uniqueOrigins: new Set(),
    uniqueCategories: new Set(),
    weightDistribution: {},
    compressionRatio: 0
  };
  
  let totalLength = 0;
  let morphemeLength = 0;
  
  for (const morpheme of morphemes) {
    totalLength += morpheme.length;
    morphemeLength += morpheme.morpheme.length;
    
    compressionData.uniqueOrigins.add(morpheme.data.origin);
    compressionData.uniqueCategories.add(morpheme.data.category);
    
    const weight = morpheme.data.weight || 1;
    compressionData.weightDistribution[weight] = 
      (compressionData.weightDistribution[weight] || 0) + 1;
  }
  
  compressionData.compressionRatio = morphemeLength / totalLength;
  compressionData.uniqueOrigins = compressionData.uniqueOrigins.size;
  compressionData.uniqueCategories = compressionData.uniqueCategories.size;
  
  return compressionData;
}

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/analyze', (req, res) => {
  const { text } = req.body;
  
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Invalid text input' });
  }
  
  try {
    const analysis = analyzeMorphemes(text);
    res.json({ 
      analysis,
      metadata: {
        inputLength: text.length,
        wordCount: text.split(/\s+/).filter(w => w.length > 0).length,
        morphemeDatabase: {
          prefixCount: Object.keys(enhancedMorphemeDatabase).length,
          rootCount: Object.keys(enhancedRootDatabase).length,
          phonemeCount: Object.keys(phonemeDatabase).length
        }
      }
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Analysis failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Morpheme Analysis Server running on http://localhost:${PORT}`);
  console.log(`Database loaded: ${Object.keys(enhancedMorphemeDatabase).length} morphemes, ${Object.keys(enhancedRootDatabase).length} roots, ${Object.keys(phonemeDatabase).length} phonemes`);
});