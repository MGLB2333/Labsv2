import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  TextField,
  IconButton,
  Chip,
  Button,
  Link,
  Modal,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputAdornment,
} from '@mui/material';
import {
  Send,
  AutoAwesome,
  CheckCircle,
  RadioButtonUnchecked,
  Info,
  People,
  Analytics,
  Inventory,
  Close,
  ExpandMore,
  ExpandLess,
  Settings,
  Assessment,
  ArrowBack,
  CalendarToday,
} from '@mui/icons-material';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'thinking';
  content: string;
  timestamp: Date;
  thinkingSteps?: ThinkingStep[];
  showKPICards?: boolean;
  showKPIOptions?: 'topOfFunnel' | 'middleOfFunnel' | 'bottomOfFunnel';
}

interface ThinkingStep {
  id: string;
  label: string;
  completed: boolean;
}

interface MediaPlanDetail {
  id: string;
  label: string;
  value: string;
  category: 'budget' | 'timing' | 'audience' | 'channels' | 'kpis';
  audienceType?: 'primary' | 'secondary';
}

interface MediaPlanSection {
  id: string;
  title: string;
  question: string;
  icon: React.ReactNode;
  completed: boolean;
  answer: string;
  rationale: string;
}

const AiAssistantPage: React.FC = () => {
  const navigate = useNavigate();
  const [hasStartedChatting, setHasStartedChatting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [planDetails, setPlanDetails] = useState<MediaPlanDetail[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [campaignInfo, setCampaignInfo] = useState({
    advertiser: '',
    startDate: '',
    endDate: '',
    budget: '£30,000',
  });
  const [budgetType, setBudgetType] = useState('Total Budget');
  const [openRationaleModal, setOpenRationaleModal] = useState(false);
  const [selectedRationale] = useState('');
  const [loadingSectionId, setLoadingSectionId] = useState<string | null>(null);
  const [isBuildingCampaign, setIsBuildingCampaign] = useState(false);
  const [selectedKPIs, setSelectedKPIs] = useState<string[]>([]);
  const [openKPIModal, setOpenKPIModal] = useState(false);
  const [selectedFunnelStage, setSelectedFunnelStage] = useState<'topOfFunnel' | 'middleOfFunnel' | 'bottomOfFunnel' | null>(null);
  const [selectedDetailRationale, setSelectedDetailRationale] = useState<{ detail: MediaPlanDetail; rationale: string } | null>(null);
  const [openDetailRationaleModal, setOpenDetailRationaleModal] = useState(false);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    details: true,
    kpis: false,
    audience: false,
    measurement: false,
    inventory: false,
  });
  const [typingMessages, setTypingMessages] = useState<{ [key: string]: string }>({});
  const typingStartedRef = React.useRef<Set<string>>(new Set());
  const [footfallQuestionDismissed, setFootfallQuestionDismissed] = useState(false);
  const [footfallSubQuestionDisplay, setFootfallSubQuestionDisplay] = useState('');
  const footfallTypingStartedRef = React.useRef(false);

  // KPI data structure based on funnel stages
  const kpiData = {
    topOfFunnel: {
      readilyAvailable: [
        'Impressions',
        'Reach / Unique',
        'Frequency',
        'Completed Views',
        'VTR (View-Through Rate)',
        'Viewability (IAS)',
        'Media Efficiency (CPM, CPCV)',
      ],
      pixelRequired: [
        'Viewability (IAS, DV)',
        'Attention (Lumen)',
      ],
      modellingRequired: [
        'Cross Platform Reach',
        'Share of Voice',
      ],
      surveyBased: [
        'Brand Lift',
        'Ad Recall Lift',
      ],
      clientSpecific: [
        'Origin results (Cross platform reach)',
        'CFlight (TV and BVOD Reach)',
      ],
    },
    middleOfFunnel: {
      readilyAvailable: [
        'Click Through (CTR)',
        'Engagement rates (likes, shares etc. Meta ads manager)',
        'VTRs for Skippable',
        'Site Visits (GA)',
        'Media Efficiency (CPC, CPE)',
      ],
      pixelRequired: [
        'Site visits (non GA)',
      ],
      modellingRequired: [],
      surveyBased: [
        'Consideration Lift',
      ],
      clientSpecific: [
        'Brand tracking performance',
      ],
    },
    bottomOfFunnel: {
      readilyAvailable: [
        'CPA (GA/MAT)',
        'ROAS (GA/MAT)',
      ],
      pixelRequired: [
        'Conversions (non GA)',
        'Amazon Retail',
        'Footfall',
      ],
      modellingRequired: [
        'Incrementality testing',
      ],
      surveyBased: [
        'Purchase Intent Lift',
      ],
      clientSpecific: [
        'Econometrics',
        'MMM (Marketing Mix Modeling)',
      ],
    },
  };
  const [sections, setSections] = useState<MediaPlanSection[]>([
    { 
      id: 'kpis', 
      title: 'KPIs', 
      question: 'What key performance indicators are important for this campaign?', 
      icon: <Assessment />, 
      completed: false, 
      answer: '',
      rationale: 'Key performance indicators help track the success of your campaign. Common KPIs include reach, frequency, impressions, completion rates, and conversion metrics. We\'ll optimize your media plan to achieve these targets.'
    },
    { 
      id: 'audience', 
      title: 'Audience', 
      question: 'Now tell me about your target audience.', 
      icon: <People />, 
      completed: false, 
      answer: '',
      rationale: 'Using Experian Mosaic data, we\'ve identified the best audience segments for families with children. These segments are optimized for reach and engagement based on viewing patterns and demographic data.'
    },
    { 
      id: 'measurement', 
      title: 'Measurement', 
      question: 'How do you want to measure campaign success?', 
      icon: <Analytics />, 
      completed: false, 
      answer: '',
      rationale: 'Blis Footfall study provides comprehensive measurement of campaign effectiveness by tracking real-world consumer behavior and foot traffic. This gives you insights into how TV advertising drives actual store visits and conversions.'
    },
    { 
      id: 'inventory', 
      title: 'Inventory', 
      question: 'What inventory do you want to run on?', 
      icon: <Inventory />, 
      completed: false, 
      answer: '',
      rationale: 'Inventory Group - All TV provides access to the full spectrum of TV inventory including linear TV, CTV, and VOD platforms. This ensures maximum reach across all viewing behaviors and demographics.'
    },
  ]);

  // Initialize first question when chat starts
  useEffect(() => {
    if (hasStartedChatting && messages.length === 0) {
      const initialMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Tell me about the advertiser, dates, and budget for your campaign.',
        timestamp: new Date(),
      };
      setMessages([initialMessage]);
    }
  }, [hasStartedChatting, messages.length]);

  // Auto-scroll chat to bottom when messages change
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-scroll when footfall sub-question is typing or buttons appear
  useEffect(() => {
    if (footfallSubQuestionDisplay) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  }, [footfallSubQuestionDisplay]);

  // Auto-scroll media plan to bottom when plan details change or sections expand
  const planContentRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Small delay to ensure DOM has updated
    setTimeout(() => {
      if (planContentRef.current) {
        planContentRef.current.scrollTo({
          top: planContentRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 100);
  }, [planDetails, expandedSections]);

  // Expand sections when they're completed
  useEffect(() => {
    sections.forEach((section) => {
      if (section.completed) {
        setExpandedSections((prev) => {
          if (!prev[section.id]) {
            return {
              ...prev,
              [section.id]: true,
            };
          }
          return prev;
        });
      }
    });
  }, [sections]);

  // Typing animation for AI assistant questions
  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];

    messages.forEach((message) => {
      // Only animate assistant messages that are questions (not thinking, not KPI cards/options)
      if (
        message.role === 'assistant' &&
        !message.thinkingSteps &&
        !message.showKPICards &&
        !message.showKPIOptions &&
        message.content &&
        !typingStartedRef.current.has(message.id) &&
        sections.some(s => s.question === message.content)
      ) {
        const fullText = message.content;
        let currentIndex = 0;
        
        // Mark as started
        typingStartedRef.current.add(message.id);
        setTypingMessages((prev) => ({ ...prev, [message.id]: '' }));

        const typingInterval = setInterval(() => {
          if (currentIndex < fullText.length) {
            const displayText = fullText.slice(0, currentIndex + 1);
            setTypingMessages((prev) => ({ ...prev, [message.id]: displayText }));
            currentIndex++;
          } else {
            clearInterval(typingInterval);
          }
        }, 30); // 30ms per character for smooth typing

        intervals.push(typingInterval);
      }
    });

    return () => {
      intervals.forEach((interval) => clearInterval(interval));
    };
  }, [messages, sections]);

  // Typing animation for footfall sub-question
  useEffect(() => {
    const measurementMessage = messages.find(
      msg => msg.role === 'assistant' && 
      msg.content === 'How do you want to measure campaign success?'
    );
    
    if (
      measurementMessage && 
      !footfallQuestionDismissed &&
      !planDetails.some(d => d.category === 'timing' && d.value === 'Blis Footfall study') &&
      !footfallTypingStartedRef.current
    ) {
      const mainQuestionText = 'How do you want to measure campaign success?';
      const isMainQuestionComplete = typingMessages[measurementMessage.id] === mainQuestionText;
      
      // Only start if main question is complete
      if (isMainQuestionComplete) {
        footfallTypingStartedRef.current = true;
        
        // Wait 500ms after main question completes
        let typingInterval: NodeJS.Timeout | null = null;
        const delayTimeout = setTimeout(() => {
          const fullText = 'Based on your KPI of footfall, we recommend running a footfall study. Do you want me to find you one?';
          let currentIndex = 0;
          
          typingInterval = setInterval(() => {
            if (currentIndex < fullText.length) {
              setFootfallSubQuestionDisplay(fullText.slice(0, currentIndex + 1));
              currentIndex++;
            } else {
              if (typingInterval) clearInterval(typingInterval);
            }
          }, 30); // 30ms per character
        }, 500);

        return () => {
          clearTimeout(delayTimeout);
          if (typingInterval) clearInterval(typingInterval);
        };
      }
    }
  }, [messages, typingMessages, footfallQuestionDismissed, planDetails]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Start the conversation on first message
    if (!hasStartedChatting) {
      setHasStartedChatting(true);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');

    // Set loading section ID for media plan
    let sectionIdToLoad: string | null = null;
    if (currentQuestionIndex === -1) {
      sectionIdToLoad = 'kpis'; // Will load KPIs after first question
    } else if (currentQuestionIndex < sections.length) {
      sectionIdToLoad = sections[currentQuestionIndex].id;
    }
    setLoadingSectionId(sectionIdToLoad);

    // Get thinking steps based on section
    const getThinkingSteps = (sectionId: string | null): ThinkingStep[] => {
      if (!sectionId) return [];
      
      switch (sectionId) {
        case 'audience':
          return [
            { id: '1', label: 'Searching through data partners', completed: false },
            { id: '2', label: 'Finding segment matches', completed: false },
            { id: '3', label: 'Suggesting appropriate segments', completed: false },
            { id: '4', label: 'Validating audience fit', completed: false },
          ];
        case 'kpis':
          return [
            { id: '1', label: 'Adding campaign details', completed: false },
          ];
        case 'measurement':
          return [
            { id: '1', label: 'Reviewing measurement solutions', completed: false },
            { id: '2', label: 'Matching to campaign objectives', completed: false },
            { id: '3', label: 'Selecting best fit', completed: false },
          ];
        case 'inventory':
          return [
            { id: '1', label: 'Scanning available inventory', completed: false },
            { id: '2', label: 'Matching to audience segments', completed: false },
            { id: '3', label: 'Optimizing channel mix', completed: false },
          ];
        default:
          return [
            { id: '1', label: 'Processing your request', completed: false },
            { id: '2', label: 'Finding the best match', completed: false },
          ];
      }
    };

    // Show thinking process with checklist
    const thinkingSteps = getThinkingSteps(sectionIdToLoad);
    const thinkingMessageId = `thinking-${Date.now()}`;
    const thinkingMessage: Message = {
      id: thinkingMessageId,
      role: 'thinking',
      content: '',
      timestamp: new Date(),
      thinkingSteps: thinkingSteps,
    };
    setMessages((prev) => [...prev, thinkingMessage]);

    // Animate through thinking steps - slower pace
    let stepIndex = 0;
    const stepInterval = setInterval(() => {
      if (stepIndex < thinkingSteps.length) {
        setMessages((prev) =>
          prev.map((msg) => {
            if (msg.id === thinkingMessageId && msg.thinkingSteps) {
              return {
                ...msg,
                thinkingSteps: msg.thinkingSteps.map((step, idx) => ({
                  ...step,
                  completed: idx < stepIndex, // Mark previous step as completed
                })),
              };
            }
            return msg;
          })
        );
        stepIndex++;
      } else {
        clearInterval(stepInterval);
        // Mark all steps as completed after animation
        setMessages((prev) =>
          prev.map((msg) => {
            if (msg.id === thinkingMessageId && msg.thinkingSteps) {
              return {
                ...msg,
                thinkingSteps: msg.thinkingSteps.map((step) => ({
                  ...step,
                  completed: true,
                })),
              };
            }
            return msg;
          })
        );
      }
    }, 1000); // Slowed down to 1000ms (1 second) per step

    // Process the answer and move to next question after all steps complete
    const totalTime = thinkingSteps.length * 1000 + 500;
    setTimeout(() => {
      clearInterval(stepInterval);
      setLoadingSectionId(null);
      // Mark all thinking steps as completed instead of removing
      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.id === thinkingMessageId && msg.thinkingSteps) {
            return {
              ...msg,
              thinkingSteps: msg.thinkingSteps.map((step) => ({
                ...step,
                completed: true,
              })),
            };
          }
          return msg;
        })
      );
      
      // Handle first question (campaign details) separately
      if (currentQuestionIndex === -1 || (currentQuestionIndex === 0 && sections[0].id !== 'kpis')) {
        // First question about campaign details
        const budgetMatch = currentInput.match(/[\d,]+/);
        setCampaignInfo({
          advertiser: 'Asda',
          startDate: '1st December',
          endDate: '30th December',
          budget: budgetMatch ? `£${budgetMatch[0]}` : '£30,000',
        });
        // Move to first section (kpis)
        setCurrentQuestionIndex(0);
        setTimeout(() => {
        const nextMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: sections[0].question,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, nextMessage]);
        }, 500);
      } else {
        processAnswer(currentInput, currentQuestionIndex);
        
        if (currentQuestionIndex < sections.length - 1) {
          const nextIndex = currentQuestionIndex + 1;
          setCurrentQuestionIndex(nextIndex);
          setTimeout(() => {
          const nextMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: sections[nextIndex].question,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, nextMessage]);
          }, 500);
        } else {
          const finalMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: 'Perfect! I have all the information I need. Review your media plan on the right and click "Build Full Campaign" when ready.',
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, finalMessage]);
        }
      }
    }, totalTime);
  };

  const handleRemoveDetail = (detailId: string) => {
    setPlanDetails((prev) => prev.filter((detail) => detail.id !== detailId));
  };

  // Get mock rationale for a detail item
  const getDetailRationale = (detail: MediaPlanDetail): string => {
    if (detail.category === 'audience') {
      return `This audience segment was selected because it aligns perfectly with Asda's target demographic of families with children. The segment shows high engagement with retail advertising and has demonstrated strong response rates to similar campaigns. Using Experian Mosaic data, we've identified this segment as having optimal viewing patterns during peak shopping hours, making it ideal for driving footfall to Asda stores.`;
    } else if (detail.category === 'timing') {
      return `This measurement solution was chosen because it provides comprehensive tracking of campaign effectiveness. It offers real-time insights into consumer behavior and foot traffic, allowing for accurate attribution of TV advertising to actual store visits. The solution integrates seamlessly with Asda's existing analytics infrastructure and provides detailed reporting on campaign performance metrics.`;
    } else if (detail.category === 'channels') {
      return `This inventory channel was selected based on its ability to reach Asda's target audience effectively. The channel offers optimal CPM rates and high reach within the desired demographic segments. It provides excellent coverage during peak viewing times when families are most likely to be watching together, maximizing the impact of the campaign message.`;
    }
    return 'This selection was made based on comprehensive analysis of campaign objectives and target audience behavior.';
  };

  const processAnswer = (input: string, questionIndex: number) => {
    const sectionId = sections[questionIndex].id;
    
    // Determine answer to display (mock data for some sections)
    let answerToShow = input;
    if (sectionId === 'audience') {
      answerToShow = 'Experian Mosaic segments identified for families with children';
    } else if (sectionId === 'measurement') {
      answerToShow = 'Blis Footfall study selected for campaign measurement';
    } else if (sectionId === 'kpis') {
      answerToShow = selectedKPIs.length > 0 ? `Selected ${selectedKPIs.length} KPIs` : 'Reach, frequency, and completion rate prioritized';
    } else if (sectionId === 'inventory') {
      answerToShow = 'Inventory Group - All TV selected';
    }
    
    // Update section with answer and mark as completed
    setSections((prev) =>
      prev.map((section, index) => {
        if (index === questionIndex) {
          return { ...section, completed: true, answer: answerToShow };
        }
        return section;
      })
    );

    if (sectionId === 'audience') {
      // Generate Primary audiences (broad demographics for linear TV)
      const primaryAudiences = [
        { id: 'primary-1', label: 'Primary Audience', value: 'Ages 25-54, ABC1, All Adults' },
        { id: 'primary-2', label: 'Primary Audience', value: 'Ages 35-64, ABC1C2, Families' },
      ];
      
      // Generate Secondary audiences (specific 3rd party segments like Experian)
      const secondaryAudiences = [
        { id: 'secondary-1', label: 'Experian Mosaic', value: 'Family Basics - Ages 25-44, ABC1, 2+ children' },
        { id: 'secondary-2', label: 'Experian Mosaic', value: 'Young Families - Ages 25-35, C1C2, 1-2 children' },
        { id: 'secondary-3', label: 'Experian Mosaic', value: 'Comfortable Families - Ages 35-50, AB, 2+ children' },
      ];
      
      setPlanDetails((prev) => [
        ...prev,
        ...primaryAudiences.map(seg => ({
          id: seg.id,
          label: seg.label,
          value: seg.value,
          category: 'audience' as const,
          audienceType: 'primary' as const,
        })),
        ...secondaryAudiences.map(seg => ({
          id: seg.id,
          label: seg.label,
          value: seg.value,
          category: 'audience' as const,
          audienceType: 'secondary' as const,
        })),
      ]);
    } else if (sectionId === 'measurement') {
      const metrics = [
        { id: 'metric-1', label: 'Measurement Solution', value: 'Blis Footfall study' },
      ];
      
      setPlanDetails((prev) => [
        ...prev,
        ...metrics.map(metric => ({
          id: metric.id,
          label: metric.label,
          value: metric.value,
          category: 'timing' as const,
        })),
      ]);
    } else if (sectionId === 'kpis') {
      // Use selected KPIs from the selector
      const kpis = selectedKPIs.map((kpi, index) => ({
        id: `kpi-${index + 1}`,
        label: `KPI ${index + 1}`,
        value: kpi,
        category: 'kpis' as const,
      }));
      
      // If no KPIs selected, use default ones
      if (kpis.length === 0) {
        kpis.push(
          { id: 'kpi-1', label: 'Primary KPI', value: 'Reach: Target 80%+ of target audience', category: 'kpis' as const },
          { id: 'kpi-2', label: 'Secondary KPI', value: 'Frequency: Average 3-4 exposures', category: 'kpis' as const },
          { id: 'kpi-3', label: 'Tertiary KPI', value: 'Completion Rate: Maintain 95%+', category: 'kpis' as const }
        );
      }
      
      setPlanDetails((prev) => [
        ...prev,
        ...kpis,
      ]);
    } else if (sectionId === 'inventory') {
      const inventory = [
        { id: 'inv-1', label: 'Inventory Group', value: 'All TV' },
      ];
      
      setPlanDetails((prev) => [
        ...prev,
        ...inventory.map(inv => ({
          id: inv.id,
          label: inv.label,
          value: inv.value,
          category: 'channels' as const,
        })),
      ]);
    }
  };


  // Welcome Screen - Before conversation starts
  if (!hasStartedChatting) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#f5f5f5',
          backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Top Bar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 3,
          }}
        >
          <Box
            component="button"
            onClick={() => navigate('/')}
            sx={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              '&:hover': {
                opacity: 0.8,
              },
            }}
          >
            <Box
              component="img"
              src="/LightBox_POS.png"
              alt="Lightbox TV"
              sx={{
                height: 28,
                width: 'auto',
              }}
            />
          </Box>

          <Link
            component="button"
            onClick={() => navigate('/')}
            sx={{
              color: '#02b5e7',
              textDecoration: 'underline',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            End Chat & Continue
          </Link>
        </Box>

        {/* Prompt Text Section - Top */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            px: 4,
            pt: 6,
            pb: 4,
          }}
        >
          {/* AI Icon */}
          <Box
            sx={{
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AutoAwesome sx={{ fontSize: 48, color: '#02b5e7' }} />
          </Box>

          {/* Main Prompt */}
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 400,
              color: '#999',
              textAlign: 'center',
              mb: 1.5,
            }}
          >
            Let's build your media plan.
          </Typography>

          {/* Campaign Questions */}
          <Typography
            sx={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#333',
              textAlign: 'center',
              mb: 1.5,
              lineHeight: 1.6,
            }}
          >
            Tell me about your media campaign
          </Typography>

          {/* Explanatory Text */}
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 400,
              color: '#999',
              textAlign: 'center',
              mb: 2,
              maxWidth: 800,
              lineHeight: 1.5,
            }}
          >
            Share your campaign goals, target audience, budget, and timeline. I'll guide you through creating a comprehensive media plan tailored to your advertising needs.
          </Typography>
        </Box>

        {/* Centered Content - Input Area */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            px: 4,
            pb: 4,
          }}
        >
          {/* Input Area */}
          <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
            {/* Helper Buttons */}
            <Box sx={{ display: 'flex', gap: 1, mb: 2, justifyContent: 'center' }}>
              <Button
                variant="text"
                size="small"
                sx={{
                  fontSize: '12px',
                  textTransform: 'none',
                  color: '#333',
                  backgroundColor: '#fff',
                  borderRadius: 3,
                  px: 2,
                  py: 0.75,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                Help me answer
              </Button>
              <Button
                variant="text"
                size="small"
                sx={{
                  fontSize: '12px',
                  textTransform: 'none',
                  color: '#333',
                  backgroundColor: '#fff',
                  borderRadius: 3,
                  px: 2,
                  py: 0.75,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                Skip question
              </Button>
              <Button
                variant="text"
                size="small"
                onClick={() => navigate('/')}
                sx={{
                  fontSize: '12px',
                  textTransform: 'none',
                  color: '#666',
                  backgroundColor: '#e0e0e0',
                  borderRadius: 2,
                  px: 2,
                  py: 0.75,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  '&:hover': {
                    backgroundColor: '#d0d0d0',
                  },
                }}
              >
                End chat & continue
                <Send sx={{ fontSize: 14, transform: 'rotate(-45deg)' }} />
              </Button>
            </Box>

            {/* Input Field with Integrated Button */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                border: '1px solid #02b5e7',
                borderRadius: 3,
                backgroundColor: '#fff',
                overflow: 'hidden',
              }}
            >
              <TextField
                fullWidth
                placeholder="Write your answer"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    border: 'none',
                    borderRadius: 0,
                    '& fieldset': {
                      border: 'none',
                    },
                    '&:hover fieldset': {
                      border: 'none',
                    },
                    '&.Mui-focused fieldset': {
                      border: 'none',
                    },
                  },
                }}
              />
              <IconButton
                onClick={handleSend}
                disabled={!inputValue.trim()}
                sx={{
                  width: 48,
                  height: 48,
                  backgroundColor: '#e0e0e0',
                  color: '#666',
                  borderRadius: '0 12px 12px 0',
                  mr: 0,
                  my: 0,
                  flexShrink: 0,
                  '&:hover': {
                    backgroundColor: '#d0d0d0',
                  },
                  '&:disabled': {
                    backgroundColor: '#f0f0f0',
                    color: '#999',
                  },
                }}
              >
                <Send sx={{ fontSize: 20 }} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  // Chat View - After conversation starts
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#f5f5f5',
        backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 4,
        overflow: 'hidden',
        animation: 'slideIn 0.3s ease-out',
        '@keyframes slideIn': {
          from: {
            opacity: 0,
            transform: 'translateX(-20px)',
          },
          to: {
            opacity: 1,
            transform: 'translateX(0)',
          },
        },
      }}
    >
      {/* Building Campaign Loading Overlay */}
      {isBuildingCampaign && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#f5f5f5',
            backgroundImage: `
              linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            gap: 3,
            animation: 'fadeIn 0.3s ease-in',
            '@keyframes fadeIn': {
              from: { opacity: 0 },
              to: { opacity: 1 },
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              p: 4,
              borderRadius: 3,
              backgroundColor: '#fff',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              maxWidth: 400,
            }}
          >
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CircularProgress
                sx={{
                  color: '#02b5e7',
                  animation: 'spin 1s linear infinite',
                  '@keyframes spin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                  },
                }}
                size={64}
                thickness={4}
              />
              <Box
                sx={{
                  position: 'absolute',
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#f0f7ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <AutoAwesome sx={{ color: '#02b5e7', fontSize: 20 }} />
              </Box>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                sx={{
                  fontSize: '22px',
                  fontWeight: 600,
                  color: '#333',
                  mb: 1,
                  letterSpacing: '-0.3px',
                }}
              >
                Hang tight building your TV campaign plan
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#666',
                  lineHeight: 1.6,
                }}
              >
                We're assembling your media plan with optimized inventory and audience targeting
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      {/* Top Bar Header */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 3,
          zIndex: 1000,
          }}
        >
          <Box
            component="button"
            onClick={() => navigate('/')}
            sx={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              '&:hover': {
                opacity: 0.8,
              },
            }}
          >
            <Box
              component="img"
              src="/LightBox_POS.png"
              alt="Lightbox TV"
              sx={{
                height: 28,
                width: 'auto',
              }}
            />
          </Box>
        <Link
          component="button"
          onClick={() => navigate('/')}
          sx={{
            color: '#02b5e7',
            textDecoration: 'underline',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          End chat & continue
        </Link>
        </Box>

      {/* Chat Section - Left Floating */}
      <Box
        sx={{
          position: 'absolute',
          left: '3%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '45%',
          maxWidth: 550,
          height: '85%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >

        {/* Messages */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
            backgroundColor: 'transparent',
          }}
        >
            {messages.map((message) => {
              // Render thinking process (checklist style)
              if (message.role === 'thinking' && message.thinkingSteps) {
                return (
              <Box
                key={message.id}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1.5,
                      mb: 1,
                }}
              >
                  <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                      }}
                    >
                      {message.thinkingSteps.map((step, index) => {
                        // Find the first incomplete step (current step being processed)
                        const firstIncompleteIndex = message.thinkingSteps?.findIndex(s => !s.completed) ?? -1;
                        const isCurrentStep = index === firstIncompleteIndex && firstIncompleteIndex !== -1;
                        return (
                          <Box
                            key={step.id}
                            sx={{
                      display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              fontSize: '13px',
                              color: step.completed ? '#666' : '#333',
                            }}
                          >
                            {step.completed ? (
                              <CheckCircle sx={{ fontSize: 16, color: '#666' }} />
                            ) : isCurrentStep ? (
                              <CircularProgress size={16} sx={{ color: '#666' }} />
                            ) : (
                              <RadioButtonUnchecked sx={{ fontSize: 16, color: '#999' }} />
                            )}
                            <Typography
                              sx={{
                                fontSize: '13px',
                                color: step.completed ? '#666' : '#333',
                              }}
                            >
                              {step.label}
                            </Typography>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                );
              }

              // Render KPI cards
              if (message.showKPICards) {
                return (
                  <Box
                    key={message.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1.5,
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      <Typography sx={{ fontSize: '13px', color: '#666', mb: 0.5 }}>
                        Select which part of the funnel you'd like to focus on:
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5 }}>
                      <Paper
                        onClick={() => {
                          setMessages((prev) =>
                            prev.map((msg) =>
                              msg.id === message.id
                                ? { ...msg, showKPICards: false, showKPIOptions: 'topOfFunnel' }
                                : msg
                            )
                          );
                        }}
                        sx={{
                          width: 140,
                          height: 140,
                          minWidth: 140,
                          minHeight: 140,
                          flexShrink: 0,
                          p: 1.5,
                          cursor: 'pointer',
                          border: '2px solid #e0e0e0',
                          borderRadius: 2,
            backgroundColor: '#f5f5f5',
                          display: 'flex',
                          flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                          gap: 1,
                          boxShadow: 'none',
                          '&:hover': {
                            backgroundColor: '#eeeeee',
                          },
                          transition: 'all 0.2s',
                        }}
                      >
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#333', mb: 0.25, lineHeight: 1.4 }}>
                            Top of<br />Funnel
                          </Typography>
                          <Typography sx={{ fontSize: '11px', color: '#666' }}>
                            Awareness and reach metrics
                          </Typography>
                        </Box>
                      </Paper>

                      <Paper
                        onClick={() => {
                          setMessages((prev) =>
                            prev.map((msg) =>
                              msg.id === message.id
                                ? { ...msg, showKPICards: false, showKPIOptions: 'middleOfFunnel' }
                                : msg
                            )
                          );
                        }}
                        sx={{
                          width: 140,
                          height: 140,
                          minWidth: 140,
                          minHeight: 140,
                      flexShrink: 0,
                          p: 1.5,
                          cursor: 'pointer',
                          border: '2px solid #e0e0e0',
                          borderRadius: 2,
                          backgroundColor: '#f5f5f5',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 1,
                          boxShadow: 'none',
                          '&:hover': {
                            backgroundColor: '#eeeeee',
                          },
                          transition: 'all 0.2s',
                        }}
                      >
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#333', mb: 0.25 }}>
                            Middle of Funnel
                          </Typography>
                          <Typography sx={{ fontSize: '11px', color: '#666' }}>
                            Consideration and engagement metrics
                          </Typography>
                  </Box>
                      </Paper>

                      <Paper
                        onClick={() => {
                          setMessages((prev) =>
                            prev.map((msg) =>
                              msg.id === message.id
                                ? { ...msg, showKPICards: false, showKPIOptions: 'bottomOfFunnel' }
                                : msg
                            )
                          );
                        }}
                    sx={{
                          width: 140,
                          height: 140,
                          minWidth: 140,
                          minHeight: 140,
                      flexShrink: 0,
                          p: 1.5,
                          cursor: 'pointer',
                          border: '2px solid #e0e0e0',
                          borderRadius: 2,
                          backgroundColor: '#f5f5f5',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 1,
                          boxShadow: 'none',
                          '&:hover': {
                            backgroundColor: '#eeeeee',
                          },
                          transition: 'all 0.2s',
                        }}
                      >
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#333', mb: 0.25 }}>
                            Bottom of Funnel
                          </Typography>
                          <Typography sx={{ fontSize: '11px', color: '#666' }}>
                            Conversion and purchase metrics
                          </Typography>
                        </Box>
                      </Paper>
                      </Box>
                    </Box>
                  </Box>
                );
              }

              // Render KPI options
              if (message.showKPIOptions) {
                const funnelData = kpiData[message.showKPIOptions];
                return (
              <Box
                key={message.id}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1.5,
                }}
              >
                    <Box
                    sx={{
                        maxWidth: '75%',
                        p: 2,
                        borderRadius: 3,
                        backgroundColor: '#f5f5f5',
                        color: '#333',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <IconButton
                          onClick={() => {
                            setMessages((prev) =>
                              prev.map((msg) =>
                                msg.id === message.id
                                  ? { ...msg, showKPIOptions: undefined, showKPICards: true }
                                  : msg
                              )
                            );
                          }}
                          size="small"
                          sx={{
                            color: '#666',
                            '&:hover': {
                              backgroundColor: '#eeeeee',
                            },
                          }}
                        >
                          <ArrowBack sx={{ fontSize: 18 }} />
                        </IconButton>
                        <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#666' }}>
                          {message.showKPIOptions === 'topOfFunnel' ? 'Top of Funnel' : message.showKPIOptions === 'middleOfFunnel' ? 'Middle of Funnel' : 'Bottom of Funnel'}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        {Object.entries(funnelData).map(([category, items]) =>
                          items.length > 0 ? (
                            <Box key={category}>
                              <Typography sx={{ fontSize: '11px', fontWeight: 600, color: '#666', mb: 1, textTransform: 'capitalize' }}>
                                {category.replace(/([A-Z])/g, ' $1').trim()}
                              </Typography>
                              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                {items.map((kpi) => (
                                  <FormControlLabel
                                    key={kpi}
                                    control={
                                      <Checkbox
                                        size="small"
                                        checked={selectedKPIs.includes(kpi)}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            setSelectedKPIs([...selectedKPIs, kpi]);
                                          } else {
                                            setSelectedKPIs(selectedKPIs.filter((k) => k !== kpi));
                                          }
                                        }}
                                        sx={{
                                          py: 0.25,
                                          '& .MuiSvgIcon-root': { fontSize: 18 },
                                        }}
                                      />
                                    }
                                    label={
                                      <Typography sx={{ fontSize: '12px', color: '#333' }}>
                                        {kpi}
                                      </Typography>
                                    }
                                    sx={{ m: 0 }}
                                  />
                                ))}
                              </Box>
                            </Box>
                          ) : null
                        )}
                      </Box>
                      <Button
                        onClick={() => {
                          if (selectedKPIs.length === 0) return;

                          // Add selected KPIs to plan details
                          const kpis = selectedKPIs.map((kpi, index) => ({
                            id: `kpi-${Date.now()}-${index}`,
                            label: `KPI ${index + 1}`,
                            value: kpi,
                            category: 'kpis' as const,
                          }));

                          setPlanDetails((prev) => {
                            const filtered = prev.filter((d) => d.category !== 'kpis');
                            return [...filtered, ...kpis];
                          });

                          // Process the answer and mark section as completed
                          const answerToShow = `Selected ${selectedKPIs.length} KPIs`;
                          setSections((prev) =>
                            prev.map((section) => {
                              if (section.id === 'kpis') {
                                return { ...section, completed: true, answer: answerToShow };
                              }
                              return section;
                            })
                          );

                          // Add user message showing selected KPIs
                          const userMessage: Message = {
                            id: Date.now().toString(),
                            role: 'user',
                            content: `Selected KPIs: ${selectedKPIs.join(', ')}`,
                            timestamp: new Date(),
                          };
                          setMessages((prev) => [...prev, userMessage]);

                          // Automatically move to next question
                          const kpiSectionIndex = sections.findIndex((s) => s.id === 'kpis');
                          if (kpiSectionIndex >= 0 && kpiSectionIndex < sections.length - 1) {
                            const nextIndex = kpiSectionIndex + 1;
                            setCurrentQuestionIndex(nextIndex);

                            // Add assistant message with next question
                            setTimeout(() => {
                              const nextMessage: Message = {
                                id: (Date.now() + 1).toString(),
                                role: 'assistant',
                                content: sections[nextIndex].question,
                                timestamp: new Date(),
                              };
                              setMessages((prev) => [...prev, nextMessage]);
                            }, 500);
                          } else {
                            // All questions completed
                            const finalMessage: Message = {
                              id: (Date.now() + 1).toString(),
                              role: 'assistant',
                              content: 'Perfect! I have all the information I need. Review your media plan on the right and click "Build Full Campaign" when ready.',
                              timestamp: new Date(),
                            };
                            setMessages((prev) => [...prev, finalMessage]);
                          }

                          // Remove the KPI options message
                          setMessages((prev) => prev.filter((msg) => msg.id !== message.id));
                          setSelectedKPIs([]);
                        }}
                        variant="contained"
                        disabled={selectedKPIs.length === 0}
                        sx={{
                          mt: 2,
                          backgroundColor: '#02b5e7',
                          color: '#fff',
                          textTransform: 'none',
                          '&:hover': {
                            backgroundColor: '#0288d1',
                          },
                          '&:disabled': {
                            backgroundColor: '#e0e0e0',
                            color: '#999',
                          },
                        }}
                      >
                        Add Selected KPIs
                      </Button>
                    </Box>
                  </Box>
                );
              }

              // Render regular messages
              return (
              <Box
                key={message.id}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1.5,
                  flexDirection: message.role === 'user' ? 'row-reverse' : 'row',
                }}
              >
                {message.role === 'assistant' ? (
                  <Box sx={{ maxWidth: '75%', display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: '14px',
                        lineHeight: 1.6,
                        color: '#333',
                        fontWeight: 600,
                      }}
                    >
                      {typingMessages[message.id] !== undefined ? typingMessages[message.id] : message.content}
                    </Typography>
                    {(message.content === 'How do you want to measure campaign success?' || 
                      (typingMessages[message.id] && typingMessages[message.id].includes('How do you want to measure campaign success'))) &&
                      !planDetails.some(d => d.category === 'timing' && d.value === 'Blis Footfall study') &&
                      !footfallQuestionDismissed && (
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 0.5 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: '14px',
                            lineHeight: 1.6,
                            color: '#666',
                            fontWeight: 400,
                            minHeight: '20px',
                          }}
                        >
                          {footfallSubQuestionDisplay}
                        </Typography>
                        {footfallSubQuestionDisplay === 'Based on your KPI of footfall, we recommend running a footfall study. Do you want me to find you one?' && (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => {
                              // Add user message
                              const userMessage: Message = {
                                id: Date.now().toString(),
                                role: 'user',
                                content: 'Yes, footfall study',
                                timestamp: new Date(),
                              };
                              setMessages((prev) => [...prev, userMessage]);
                              
                              // Get measurement section index
                              const measurementSectionIndex = sections.findIndex((s) => s.id === 'measurement');
                              
                              // Show thinking process for finding footfall study
                              const footfallThinkingSteps: ThinkingStep[] = [
                                { id: '1', label: 'Searching for footfall studies', completed: false },
                                { id: '2', label: 'Finding appropriate measurement solution', completed: false },
                                { id: '3', label: 'Selecting best fit', completed: false },
                              ];
                              const thinkingMessageId = `thinking-footfall-${Date.now()}`;
                              const thinkingMessage: Message = {
                                id: thinkingMessageId,
                                role: 'thinking',
                                content: '',
                                timestamp: new Date(),
                                thinkingSteps: footfallThinkingSteps,
                              };
                              setMessages((prev) => [...prev, thinkingMessage]);
                              
                              // Animate through thinking steps
                              let stepIndex = 0;
                              const stepInterval = setInterval(() => {
                                setMessages((prev) =>
                                  prev.map((msg) => {
                                    if (msg.id === thinkingMessageId && msg.thinkingSteps) {
                                      return {
                                        ...msg,
                                        thinkingSteps: msg.thinkingSteps.map((step, idx) => ({
                                          ...step,
                                          completed: idx <= stepIndex,
                                        })),
                                      };
                                    }
                                    return msg;
                                  })
                                );
                                stepIndex++;
                                if (stepIndex >= footfallThinkingSteps.length) {
                                  clearInterval(stepInterval);
                                  
                                  // After thinking completes, process the answer
                                  if (measurementSectionIndex >= 0) {
                                    processAnswer('Yes, footfall study', measurementSectionIndex);
                                  }
                                  
                                  // Automatically move to next question
                                  if (measurementSectionIndex >= 0 && measurementSectionIndex < sections.length - 1) {
                                    const nextIndex = measurementSectionIndex + 1;
                                    setCurrentQuestionIndex(nextIndex);
                                    
                                    // Add assistant message with next question
                                    setTimeout(() => {
                                      const nextMessage: Message = {
                                        id: (Date.now() + 1).toString(),
                                        role: 'assistant',
                                        content: sections[nextIndex].question,
                                        timestamp: new Date(),
                                      };
                                      setMessages((prev) => [...prev, nextMessage]);
                                    }, 500);
                                  } else {
                                    // All questions completed
                                    setTimeout(() => {
                                      const finalMessage: Message = {
                                        id: (Date.now() + 1).toString(),
                                        role: 'assistant',
                                        content: 'Perfect! I have all the information I need. Review your media plan on the right and click "Build Full Campaign" when ready.',
                                        timestamp: new Date(),
                                      };
                                      setMessages((prev) => [...prev, finalMessage]);
                                    }, 500);
                                  }
                                }
                              }, 1000); // 1 second per step
                              
                              setFootfallSubQuestionDisplay('');
                              footfallTypingStartedRef.current = false;
                              setFootfallQuestionDismissed(true);
                            }}
                            sx={{
                              fontSize: '12px',
                              textTransform: 'none',
                              color: '#333',
                              borderColor: '#e0e0e0',
                              px: 2,
                              py: 0.5,
                              '&:hover': {
                                borderColor: '#02b5e7',
                                backgroundColor: '#f0f9ff',
                              },
                            }}
                          >
                            Yes
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => {
                              setFootfallQuestionDismissed(true);
                              setFootfallSubQuestionDisplay('');
                              footfallTypingStartedRef.current = false;
                            }}
                            sx={{
                              fontSize: '12px',
                              textTransform: 'none',
                              color: '#333',
                              borderColor: '#e0e0e0',
                              px: 2,
                              py: 0.5,
                              '&:hover': {
                                borderColor: '#e0e0e0',
                                backgroundColor: '#f5f5f5',
                              },
                            }}
                          >
                            No
                          </Button>
                        </Box>
                        )}
                      </Box>
                    )}
                  </Box>
                ) : (
                <Box
                  sx={{
                    maxWidth: '75%',
                    p: 2,
                    borderRadius: 3,
                    backgroundColor: '#fff',
                    color: '#333',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '14px',
                      lineHeight: 1.6,
                      color: '#333',
                    }}
                  >
                    {message.content}
                  </Typography>
                </Box>
                )}
              </Box>
              );
            })}
            <div ref={messagesEndRef} />
        </Box>

        {/* Input Area */}
        <Box
          sx={{
            p: 2.5,
            backgroundColor: 'transparent',
          }}
        >
            {/* Helper Buttons */}
            <Box sx={{ display: 'flex', gap: 1, mb: 1.5 }}>
              <Button
                variant="text"
                size="small"
                onClick={() => {
                  // Add KPI cards to chat if we're on the KPIs question
                  if (currentQuestionIndex >= 0 && sections[currentQuestionIndex]?.id === 'kpis') {
                    const cardsMessage: Message = {
                      id: `kpi-cards-${Date.now()}`,
                      role: 'assistant',
                      content: '',
                      timestamp: new Date(),
                      showKPICards: true,
                    };
                    setMessages((prev) => [...prev, cardsMessage]);
                  }
                }}
                sx={{
                  fontSize: '12px',
                  textTransform: 'none',
                  color: '#333',
                  backgroundColor: '#fff',
                  borderRadius: 3,
                  px: 1.5,
                  py: 0.5,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                Help me answer
              </Button>
              <Button
                variant="text"
                size="small"
                sx={{
                  fontSize: '12px',
                  textTransform: 'none',
                  color: '#333',
                  backgroundColor: '#fff',
                  borderRadius: 3,
                  px: 1.5,
                  py: 0.5,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                Skip question
              </Button>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #02b5e7',
                borderRadius: 3,
                backgroundColor: '#fff',
                overflow: 'hidden',
              }}
            >
              <TextField
                fullWidth
                placeholder="Write your answer"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    border: 'none',
                    borderRadius: 0,
                    '& fieldset': {
                      border: 'none',
                    },
                    '&:hover fieldset': {
                      border: 'none',
                    },
                    '&.Mui-focused fieldset': {
                      border: 'none',
                    },
                  },
                }}
              />
              <IconButton
                onClick={handleSend}
                disabled={!inputValue.trim()}
                sx={{
                  width: 44,
                  height: 44,
                  backgroundColor: '#e0e0e0',
                  color: '#666',
                  borderRadius: '50%',
                  mr: 0.5,
                  my: 0.5,
                  flexShrink: 0,
                  '&:hover': {
                    backgroundColor: '#d0d0d0',
                  },
                  '&:disabled': {
                    backgroundColor: '#f0f0f0',
                    color: '#999',
                  },
                }}
              >
                <Send sx={{ fontSize: 20 }} />
              </IconButton>
            </Box>
        </Box>
      </Box>

      {/* Plan Details Section - Right Floating */}
      <Box
        sx={{
          position: 'absolute',
          right: '2%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 850,
          height: '85%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 1.5,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            overflow: 'hidden',
            backgroundColor: '#fff',
            border: '1px solid #e0e0e0',
          }}
        >
          {/* Browser Window Controls */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              px: 1.5,
              py: 1,
              backgroundColor: '#f5f5f5',
              borderBottom: '1px solid #e0e0e0',
            }}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: '#ff5f57',
                cursor: 'pointer',
                '&:hover': { backgroundColor: '#ff3b30' },
              }}
            />
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: '#ffbd2e',
                cursor: 'pointer',
                '&:hover': { backgroundColor: '#ff9500' },
              }}
            />
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: '#28ca42',
                cursor: 'pointer',
                '&:hover': { backgroundColor: '#1db130' },
              }}
            />
          </Box>

          {/* Browser Address Bar */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              px: 2,
              py: 1.5,
              backgroundColor: '#fafafa',
              borderBottom: '1px solid #e0e0e0',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                component="img"
                src="https://www.asda.com/favicon.ico"
                alt="Asda"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
                sx={{
                  width: 20,
                  height: 20,
                }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
              <Typography
                sx={{
                    fontSize: '13px',
                    fontWeight: 600,
                  color: '#333',
                    lineHeight: 1.2,
                }}
              >
                  {campaignInfo.advertiser || 'Asda'} Campaign
              </Typography>
            <Typography
              sx={{
                    fontSize: '11px',
                color: '#666',
                    lineHeight: 1.2,
              }}
            >
                  {campaignInfo.startDate || '1st December'} - {campaignInfo.endDate || '30th December'}
                  {campaignInfo.budget && ` • ${campaignInfo.budget}`}
            </Typography>
              </Box>
            </Box>
            <Box sx={{ flex: 1 }} />
            <Link
              component="button"
              onClick={() => navigate('/')}
              sx={{
                color: '#02b5e7',
                textDecoration: 'none',
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer',
                px: 1,
                py: 0.5,
                borderRadius: 0.5,
                '&:hover': {
                  textDecoration: 'underline',
                  backgroundColor: '#f0f0f0',
                },
              }}
            >
              View Plan
            </Link>
          </Box>

          {/* Plan Content - Sidebar Style */}
          <Box
            ref={planContentRef}
            sx={{
              flex: 1,
              overflowY: 'auto',
              backgroundColor: '#fff',
              px: 3,
              py: 2,
            }}
          >
            {/* Details Section */}
            <Box>
                  <Box
                component="button"
                onClick={() => setExpandedSections({ ...expandedSections, details: !expandedSections.details })}
                    sx={{
                  width: 'calc(100% + 48px)',
                  mx: -3,
                      display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: 3,
                  py: 1.25,
                  backgroundColor: expandedSections.details ? '#e3f2fd' : '#f8f8f8',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  '&:hover': {
                    backgroundColor: expandedSections.details ? '#e3f2fd' : '#f8f8f8',
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Settings sx={{ fontSize: 18, color: '#666' }} />
                  <Typography
                      sx={{
                      fontSize: '13px',
                      fontWeight: 500,
                      color: '#333',
                    }}
                  >
                    Details
                  </Typography>
                </Box>
                {expandedSections.details ? (
                  <ExpandLess sx={{ fontSize: 16, color: '#666' }} />
                ) : (
                  <ExpandMore sx={{ fontSize: 16, color: '#666' }} />
                      )}
                    </Box>
              {expandedSections.details && (
                <Box sx={{ px: 2, pb: 2 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, pt: 1 }}>
                    {/* Budget & Advertiser Section */}
                    <Box>
                      <Box sx={{ display: 'flex', gap: 1, mb: 0.75 }}>
                    <Box sx={{ flex: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#333' }}>
                              Budget
                            </Typography>
                            <Info sx={{ fontSize: 14, color: '#999' }} />
                          </Box>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#333' }}>
                            Advertiser
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Box sx={{ display: 'flex', width: '50%' }}>
                          <TextField
                            value={campaignInfo.budget || '£30,000'}
                            onChange={(e) => setCampaignInfo({ ...campaignInfo, budget: e.target.value })}
                            variant="standard"
                            sx={{
                              flex: 1,
                              '& .MuiInput-root': {
                                backgroundColor: '#fafafa',
                                fontSize: '14px',
                                height: '36px',
                                px: 1.5,
                                borderTopLeftRadius: '4px',
                                borderBottomLeftRadius: '4px',
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                                '&:before': {
                                  display: 'none',
                                },
                                '&:after': {
                                  display: 'none',
                                },
                              },
                            }}
                          />
                          <FormControl sx={{ minWidth: 140 }}>
                            <Select
                              value={budgetType}
                              onChange={(e) => setBudgetType(e.target.value)}
                              variant="standard"
                              sx={{
                              backgroundColor: '#fafafa',
                                fontSize: '14px',
                                height: '36px',
                                px: 1.5,
                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0,
                                borderTopRightRadius: '4px',
                                borderBottomRightRadius: '4px',
                                '&:before': {
                                  display: 'none',
                                },
                                '&:after': {
                                  display: 'none',
                                },
                                '& .MuiSelect-select': {
                                  border: 'none',
                                },
                              }}
                            >
                              <MenuItem value="Total Budget">Total Budget</MenuItem>
                              <MenuItem value="Daily Budget">Daily Budget</MenuItem>
                            </Select>
                          </FormControl>
                          </Box>
                        <TextField
                          value={campaignInfo.advertiser || 'Asda'}
                          onChange={(e) => setCampaignInfo({ ...campaignInfo, advertiser: e.target.value })}
                          variant="standard"
                          placeholder="Advertiser"
                            sx={{
                            width: '50%',
                              '& .MuiInput-root': {
                                backgroundColor: '#fafafa',
                              fontSize: '14px',
                              height: '36px',
                              px: 1.5,
                              borderRadius: '4px',
                              '&:before': {
                                display: 'none',
                              },
                              '&:after': {
                                display: 'none',
                              },
                            },
                          }}
                        />
                      </Box>
                    </Box>

                    {/* Starts & Ends Section */}
                    <Box>
                      <Box sx={{ display: 'flex', gap: 1, mb: 0.75 }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#333' }}>
                            Start Date
                          </Typography>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#333' }}>
                            End Date
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <TextField
                          value={campaignInfo.startDate || 'Aug 13, 2024'}
                          onChange={(e) => setCampaignInfo({ ...campaignInfo, startDate: e.target.value })}
                          variant="standard"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <CalendarToday sx={{ fontSize: 18, color: '#999' }} />
                              </InputAdornment>
                            ),
                            }}
                            sx={{
                            flex: 1,
                              '& .MuiInput-root': {
                                backgroundColor: '#fafafa',
                              fontSize: '14px',
                              height: '36px',
                              px: 1.5,
                              borderRadius: '4px',
                              '&:before': {
                                display: 'none',
                              },
                              '&:after': {
                                display: 'none',
                              },
                            },
                          }}
                        />
                        <TextField
                          value={campaignInfo.endDate || 'Aug 30, 2024'}
                          onChange={(e) => setCampaignInfo({ ...campaignInfo, endDate: e.target.value })}
                          variant="standard"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <CalendarToday sx={{ fontSize: 18, color: '#999' }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            flex: 1,
                              '& .MuiInput-root': {
                                backgroundColor: '#fafafa',
                              fontSize: '14px',
                              height: '36px',
                              px: 1.5,
                              borderRadius: '4px',
                              '&:before': {
                                display: 'none',
                              },
                              '&:after': {
                                display: 'none',
                              },
                            },
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>

            {/* Sections */}
            {sections.map((section) => {
              const audienceCount = section.id === 'audience' ? planDetails.filter(d => d.category === 'audience').length : 0;
              const measurementCount = section.id === 'measurement' ? planDetails.filter(d => d.category === 'timing').length : 0;
              const inventoryCount = section.id === 'inventory' ? planDetails.filter(d => d.category === 'channels').length : 0;
              const kpisCount = section.id === 'kpis' ? planDetails.filter(d => d.category === 'kpis').length : 0;
              const itemCount = section.id === 'audience' ? audienceCount 
                : section.id === 'measurement' ? measurementCount 
                : section.id === 'inventory' ? inventoryCount
                : section.id === 'kpis' ? kpisCount
                : 0;
              
              return (
                <Box key={section.id}>
                  <Box
                            component="button"
                    onClick={() => setExpandedSections({ ...expandedSections, [section.id]: !expandedSections[section.id] })}
                            sx={{
                      width: 'calc(100% + 48px)',
                      mx: -3,
                              display: 'flex',
                              alignItems: 'center',
                      justifyContent: 'space-between',
                      px: 3,
                      py: 1.25,
                      backgroundColor: expandedSections[section.id] ? '#e3f2fd' : '#f8f8f8',
                      border: 'none',
                              cursor: 'pointer',
                      textAlign: 'left',
                              '&:hover': {
                        backgroundColor: expandedSections[section.id] ? '#e3f2fd' : '#f8f8f8',
                              },
                            }}
                          >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {section.icon}
                      <Typography
                        sx={{
                          fontSize: '13px',
                            fontWeight: 500,
                              color: '#333',
                            }}
                          >
                            {section.title}
                      </Typography>
                        </Box>
                      {itemCount > 0 && (
                        <Chip
                          label={itemCount}
                          size="small"
                            sx={{
                            height: 18,
                            fontSize: '11px',
                            fontWeight: 600,
                            backgroundColor: '#02b5e7',
                            color: '#fff',
                            '& .MuiChip-label': {
                              px: 0.75,
                            },
                          }}
                        />
                        )}
                      </Box>
                    {expandedSections[section.id] ? (
                      <ExpandLess sx={{ fontSize: 16, color: '#666' }} />
                    ) : (
                      <ExpandMore sx={{ fontSize: 16, color: '#666' }} />
                    )}
                  </Box>
                  {expandedSections[section.id] && (
                    <Box sx={{ px: 2, pb: 2 }}>
                      {loadingSectionId === section.id && (
                        <Box sx={{ pt: 1.5, display: 'flex', alignItems: 'center', gap: 1, color: '#666' }}>
                          <CircularProgress size={16} sx={{ color: '#02b5e7' }} />
                          <Typography
                            sx={{
                              fontSize: '12px',
                              color: '#666',
                              fontStyle: 'italic',
                            }}
                          >
                            Finding the best match...
                          </Typography>
                        </Box>
                      )}
                      {section.completed && loadingSectionId !== section.id && (
                        <Box sx={{ pt: 1.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                          {section.id === 'audience' && (
                            <>
                              {/* Primary Audiences */}
                              {planDetails.filter(d => d.category === 'audience' && d.audienceType === 'primary').length > 0 && (
                                <Box>
                                  <Typography sx={{ fontSize: '11px', fontWeight: 600, color: '#666', mb: 1, textTransform: 'uppercase' }}>
                                    Primary Audiences
                                  </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    {planDetails.filter(d => d.category === 'audience' && d.audienceType === 'primary').map((detail) => (
                                <Box
                                  key={detail.id}
                                  sx={{
                                    p: 1.5,
                                    borderRadius: 0.5,
                                    backgroundColor: '#f8f9fa',
                                    borderLeft: '3px solid #02b5e7',
                                    borderTop: '1px solid #e0e0e0',
                                    borderRight: '1px solid #e0e0e0',
                                    borderBottom: '1px solid #e0e0e0',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 0.5,
                                    position: 'relative',
                                  }}
                                >
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Typography
                        sx={{
                                        fontSize: '11px',
                                        fontWeight: 600,
                          color: '#666',
                                        textTransform: 'uppercase',
                        }}
                      >
                                      {detail.label}
                      </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                      <Button
                                        size="small"
                                        onClick={() => {
                                          setSelectedDetailRationale({ detail, rationale: getDetailRationale(detail) });
                                          setOpenDetailRationaleModal(true);
                                        }}
                                        sx={{
                                          fontSize: '11px',
                                          textTransform: 'none',
                              color: '#02b5e7',
                                          minWidth: 'auto',
                                          px: 1,
                                          py: 0.25,
                              '&:hover': {
                                            backgroundColor: 'rgba(2, 181, 231, 0.08)',
                              },
                            }}
                          >
                                        Rationale
                                      </Button>
                                  <IconButton
                                    onClick={() => handleRemoveDetail(detail.id)}
                                    sx={{
                                      width: 20,
                                      height: 20,
                                      padding: 0,
                                      color: '#999',
                                      '&:hover': {
                                        color: '#333',
                                        backgroundColor: 'rgba(0,0,0,0.05)',
                                      },
                                    }}
                                  >
                                    <Close sx={{ fontSize: 14 }} />
                                  </IconButton>
                                    </Box>
                      </Box>
                                  <Typography
                                    sx={{
                                      fontSize: '12px',
                                      color: '#333',
                                    }}
                                  >
                                    {detail.value}
                                  </Typography>
                                </Box>
                              ))}
                                  </Box>
                            </Box>
                          )}
                              
                              {/* Secondary Audiences */}
                              {planDetails.filter(d => d.category === 'audience' && d.audienceType === 'secondary').length > 0 && (
                                <Box>
                                  <Typography sx={{ fontSize: '11px', fontWeight: 600, color: '#666', mb: 1, textTransform: 'uppercase' }}>
                                    Secondary Audiences
                                  </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    {planDetails.filter(d => d.category === 'audience' && d.audienceType === 'secondary').map((detail) => (
                                <Box
                                  key={detail.id}
                                  sx={{
                                    p: 1.5,
                                    borderRadius: 0.5,
                                    backgroundColor: '#f8f9fa',
                                    borderLeft: '3px solid #02b5e7',
                                    borderTop: '1px solid #e0e0e0',
                                    borderRight: '1px solid #e0e0e0',
                                    borderBottom: '1px solid #e0e0e0',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 0.5,
                                    position: 'relative',
                                  }}
                                >
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                                  <Typography
                                    sx={{
                                      fontSize: '11px',
                                      fontWeight: 600,
                                      color: '#666',
                                      textTransform: 'uppercase',
                                    }}
                                  >
                                    {detail.label}
                                  </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                      <Button
                                        size="small"
                                        onClick={() => {
                                          setSelectedDetailRationale({ detail, rationale: getDetailRationale(detail) });
                                          setOpenDetailRationaleModal(true);
                                        }}
                                        sx={{
                                          fontSize: '11px',
                                          textTransform: 'none',
                                          color: '#02b5e7',
                                          minWidth: 'auto',
                                          px: 1,
                                          py: 0.25,
                                          '&:hover': {
                                            backgroundColor: 'rgba(2, 181, 231, 0.08)',
                                          },
                                        }}
                                      >
                                        Rationale
                                      </Button>
                                  <IconButton
                                    onClick={() => handleRemoveDetail(detail.id)}
                                    sx={{
                                      width: 20,
                                      height: 20,
                                      padding: 0,
                                      color: '#999',
                                      '&:hover': {
                                        color: '#333',
                                        backgroundColor: 'rgba(0,0,0,0.05)',
                                      },
                                    }}
                                  >
                                    <Close sx={{ fontSize: 14 }} />
                                  </IconButton>
                                    </Box>
                                  </Box>
                                  <Typography
                                    sx={{
                                      fontSize: '12px',
                                      color: '#333',
                                    }}
                                  >
                                    {detail.value}
                                  </Typography>
                                </Box>
                              ))}
                                  </Box>
                            </Box>
                          )}
                            </>
                          )}
                          {section.id === 'measurement' && planDetails.filter(d => d.category === 'timing').map((detail) => (
                                <Box
                                  key={detail.id}
                                  sx={{
                                    p: 1.5,
                                    borderRadius: 0.5,
                                    backgroundColor: '#f8f9fa',
                                    borderLeft: '3px solid #02b5e7',
                                    borderTop: '1px solid #e0e0e0',
                                    borderRight: '1px solid #e0e0e0',
                                    borderBottom: '1px solid #e0e0e0',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 0.5,
                                    position: 'relative',
                                  }}
                                >
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                                  <Typography
                                    sx={{
                                      fontSize: '11px',
                                      fontWeight: 600,
                                      color: '#666',
                                      textTransform: 'uppercase',
                                    }}
                                  >
                                    {detail.label}
                                  </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                      <Button
                                        size="small"
                                        onClick={() => {
                                          setSelectedDetailRationale({ detail, rationale: getDetailRationale(detail) });
                                          setOpenDetailRationaleModal(true);
                                        }}
                                        sx={{
                                          fontSize: '11px',
                                          textTransform: 'none',
                                          color: '#02b5e7',
                                          minWidth: 'auto',
                                          px: 1,
                                          py: 0.25,
                                          '&:hover': {
                                            backgroundColor: 'rgba(2, 181, 231, 0.08)',
                                          },
                                        }}
                                      >
                                        Rationale
                                      </Button>
                                      <IconButton
                                        onClick={() => handleRemoveDetail(detail.id)}
                                        sx={{
                                          width: 20,
                                          height: 20,
                                          padding: 0,
                                          color: '#999',
                                          '&:hover': {
                                            color: '#333',
                                            backgroundColor: 'rgba(0,0,0,0.05)',
                                          },
                                        }}
                                      >
                                        <Close sx={{ fontSize: 14 }} />
                                      </IconButton>
                                    </Box>
                                  </Box>
                                  <Typography
                                    sx={{
                                      fontSize: '12px',
                                      color: '#333',
                                    }}
                                  >
                                    {detail.value}
                                  </Typography>
                                </Box>
                              ))}
                          {section.id === 'kpis' && planDetails.filter(d => d.category === 'kpis').map((detail) => (
                                <Box
                                  key={detail.id}
                                  sx={{
                                    p: 1.5,
                                    borderRadius: 0.5,
                                    backgroundColor: '#f8f9fa',
                                    borderLeft: '3px solid #02b5e7',
                                    borderTop: '1px solid #e0e0e0',
                                    borderRight: '1px solid #e0e0e0',
                                    borderBottom: '1px solid #e0e0e0',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 0.5,
                                    position: 'relative',
                                  }}
                                >
                                  <IconButton
                                    onClick={() => handleRemoveDetail(detail.id)}
                                    sx={{
                                      position: 'absolute',
                                      top: 4,
                                      right: 4,
                                      width: 20,
                                      height: 20,
                                      padding: 0,
                                      color: '#999',
                                      '&:hover': {
                                        color: '#333',
                                        backgroundColor: 'rgba(0,0,0,0.05)',
                                      },
                                    }}
                                  >
                                    <Close sx={{ fontSize: 14 }} />
                                  </IconButton>
                                  <Typography
                                    sx={{
                                      fontSize: '11px',
                                      fontWeight: 600,
                                      color: '#666',
                                      textTransform: 'uppercase',
                                      pr: 3,
                                    }}
                                  >
                                    {detail.label}
                                  </Typography>
                                  <Typography
                                    sx={{
                                      fontSize: '12px',
                                      color: '#333',
                                    }}
                                  >
                                    {detail.value}
                                  </Typography>
                                </Box>
                              ))}
                          {section.id === 'inventory' && planDetails.filter(d => d.category === 'channels').map((detail) => (
                                <Box
                                  key={detail.id}
                                  sx={{
                                    p: 1.5,
                                    borderRadius: 0.5,
                                    backgroundColor: '#f8f9fa',
                                    borderLeft: '3px solid #02b5e7',
                                    borderTop: '1px solid #e0e0e0',
                                    borderRight: '1px solid #e0e0e0',
                                    borderBottom: '1px solid #e0e0e0',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 0.5,
                                    position: 'relative',
                                  }}
                                >
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                                    <Typography
                                      sx={{
                                        fontSize: '11px',
                                        fontWeight: 600,
                                        color: '#666',
                                        textTransform: 'uppercase',
                                      }}
                                    >
                                      {detail.label}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                      <Button
                                        size="small"
                                        onClick={() => {
                                          setSelectedDetailRationale({ detail, rationale: getDetailRationale(detail) });
                                          setOpenDetailRationaleModal(true);
                                        }}
                                        sx={{
                                          fontSize: '11px',
                                          textTransform: 'none',
                                          color: '#02b5e7',
                                          minWidth: 'auto',
                                          px: 1,
                                          py: 0.25,
                                          '&:hover': {
                                            backgroundColor: 'rgba(2, 181, 231, 0.08)',
                                          },
                                        }}
                                      >
                                        Rationale
                                      </Button>
                                      <IconButton
                                        onClick={() => handleRemoveDetail(detail.id)}
                                        sx={{
                                          width: 20,
                                          height: 20,
                                          padding: 0,
                                          color: '#999',
                                          '&:hover': {
                                            color: '#333',
                                            backgroundColor: 'rgba(0,0,0,0.05)',
                                          },
                                        }}
                                      >
                                        <Close sx={{ fontSize: 14 }} />
                                      </IconButton>
                            </Box>
                                  </Box>
                                  <Typography
                                    sx={{
                                      fontSize: '12px',
                                      color: '#333',
                                    }}
                                  >
                                    {detail.value}
                                  </Typography>
                                </Box>
                              ))}
                          {!section.completed && (
                            <Typography
                              sx={{
                                fontSize: '12px',
                                color: '#999',
                                fontStyle: 'italic',
                                pt: 1,
                              }}
                            >
                              {section.question}
                            </Typography>
                          )}
                        </Box>
                      )}
                      {!section.completed && loadingSectionId !== section.id && (
                        <Box sx={{ pt: 1.5 }}>
                          <Typography
                            sx={{
                              fontSize: '12px',
                              color: '#999',
                              fontStyle: 'italic',
                            }}
                          >
                            {section.question}
                          </Typography>
                    </Box>
                      )}
                  </Box>
                  )}
            </Box>
              );
            })}
            
            {/* Build Full Campaign Button */}
            {sections.every(s => s.completed) && (
              <Box sx={{ py: 2, borderTop: '1px solid #e0e0e0', mt: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    setIsBuildingCampaign(true);
                    setTimeout(() => {
                      navigate('/media-plan', {
                        state: {
                          planData: {
                            advertiser: campaignInfo.advertiser || 'Asda',
                            startDate: campaignInfo.startDate || '1st December',
                            endDate: campaignInfo.endDate || '30th December',
                            budget: campaignInfo.budget,
                            audience: planDetails.filter(d => d.category === 'audience'),
                            measurement: planDetails.filter(d => d.category === 'timing'),
                            kpis: planDetails.filter(d => d.category === 'kpis'),
                            inventory: planDetails.filter(d => d.category === 'channels'),
                          },
                        },
                      });
                    }, 3500);
                  }}
                  sx={{
                    backgroundColor: '#02b5e7',
                    color: '#fff',
                    textTransform: 'none',
                    fontSize: '13px',
                    fontWeight: 600,
                    py: 1.25,
                    borderRadius: 1,
                    '&:hover': {
                      backgroundColor: '#0288d1',
                    },
                  }}
                >
                  Build Full Campaign
                </Button>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>

      {/* Rationale Modal */}
      <Modal
        open={openRationaleModal}
        onClose={() => setOpenRationaleModal(false)}
        aria-labelledby="rationale-modal-title"
        aria-describedby="rationale-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            maxWidth: '90vw',
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="rationale-modal-title"
            variant="h6"
            component="h2"
            sx={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#333',
              mb: 2,
            }}
          >
            Rationale
          </Typography>
          <Typography
            id="rationale-modal-description"
            sx={{
              fontSize: '14px',
              color: '#666',
              lineHeight: 1.6,
              mb: 3,
            }}
          >
            {selectedRationale}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              onClick={() => setOpenRationaleModal(false)}
              variant="contained"
              sx={{
                backgroundColor: '#02b5e7',
                color: '#fff',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#0288d1',
                },
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Detail Rationale Modal */}
      <Modal
        open={openDetailRationaleModal}
        onClose={() => setOpenDetailRationaleModal(false)}
        aria-labelledby="detail-rationale-modal-title"
        aria-describedby="detail-rationale-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            maxWidth: '90vw',
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="detail-rationale-modal-title"
            variant="h6"
            component="h2"
            sx={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#333',
              mb: 1,
            }}
          >
            Rationale
          </Typography>
          {selectedDetailRationale && (
            <>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#666',
                  mb: 2,
                }}
              >
                {selectedDetailRationale.detail.label}: {selectedDetailRationale.detail.value}
              </Typography>
              <Typography
                id="detail-rationale-modal-description"
                sx={{
                  fontSize: '14px',
                  color: '#666',
                  lineHeight: 1.6,
                  mb: 3,
                }}
              >
                {selectedDetailRationale.rationale}
              </Typography>
            </>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              onClick={() => setOpenDetailRationaleModal(false)}
              variant="contained"
              sx={{
                backgroundColor: '#02b5e7',
                color: '#fff',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#0288d1',
                },
              }}
            >
              Close
            </Button>
    </Box>
        </Box>
      </Modal>

      {/* KPI Selection Modal */}
      <Modal
        open={openKPIModal}
        onClose={() => {
          setOpenKPIModal(false);
          setSelectedFunnelStage(null);
        }}
        aria-labelledby="kpi-modal-title"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            maxWidth: '90vw',
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
            overflowY: 'auto',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography
              id="kpi-modal-title"
              variant="h6"
              component="h2"
              sx={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#333',
              }}
            >
              {selectedFunnelStage ? 'Select KPIs' : 'Select Funnel Stage'}
            </Typography>
            {selectedFunnelStage && (
              <Button
                onClick={() => setSelectedFunnelStage(null)}
                sx={{
                  textTransform: 'none',
                  color: '#666',
                  fontSize: '14px',
                }}
              >
                ← Back
              </Button>
            )}
          </Box>
          
          {!selectedFunnelStage ? (
            /* Stage 1: Funnel Stage Cards */
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, justifyContent: 'center' }}>
              <Paper
                onClick={() => setSelectedFunnelStage('topOfFunnel')}
                sx={{
                  width: 200,
                  height: 200,
                  p: 2,
                  cursor: 'pointer',
                  border: '2px solid #ff9800',
                  borderRadius: 2,
                  backgroundColor: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1.5,
                  '&:hover': {
                    backgroundColor: '#fff8f0',
                    boxShadow: 4,
                  },
                  transition: 'all 0.2s',
                }}
              >
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 1,
                    backgroundColor: '#ff9800',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '28px',
                    fontWeight: 700,
                  }}
                >
                  U
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography sx={{ fontSize: '16px', fontWeight: 600, color: '#333', mb: 0.5 }}>
                    Upper Funnel
                  </Typography>
                  <Typography sx={{ fontSize: '12px', color: '#666' }}>
                    Awareness and reach metrics
                  </Typography>
                </Box>
              </Paper>

              <Paper
                onClick={() => setSelectedFunnelStage('middleOfFunnel')}
                sx={{
                  width: 200,
                  height: 200,
                  p: 2,
                  cursor: 'pointer',
                  border: '2px solid #e91e63',
                  borderRadius: 2,
                  backgroundColor: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1.5,
                  '&:hover': {
                    backgroundColor: '#fef5f9',
                    boxShadow: 4,
                  },
                  transition: 'all 0.2s',
                }}
              >
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 1,
                    backgroundColor: '#e91e63',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '28px',
                    fontWeight: 700,
                  }}
                >
                  M
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography sx={{ fontSize: '16px', fontWeight: 600, color: '#333', mb: 0.5 }}>
                    Mid Funnel
                  </Typography>
                  <Typography sx={{ fontSize: '12px', color: '#666' }}>
                    Consideration and engagement metrics
                  </Typography>
                </Box>
              </Paper>

              <Paper
                onClick={() => setSelectedFunnelStage('bottomOfFunnel')}
                sx={{
                  width: 200,
                  height: 200,
                  p: 2,
                  cursor: 'pointer',
                  border: '2px solid #03a9f4',
                  borderRadius: 2,
                  backgroundColor: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1.5,
                  '&:hover': {
                    backgroundColor: '#f0f9ff',
                    boxShadow: 4,
                  },
                  transition: 'all 0.2s',
                }}
              >
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 1,
                    backgroundColor: '#03a9f4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '28px',
                    fontWeight: 700,
                  }}
                >
                  L
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography sx={{ fontSize: '16px', fontWeight: 600, color: '#333', mb: 0.5 }}>
                    Lower Funnel
                  </Typography>
                  <Typography sx={{ fontSize: '12px', color: '#666' }}>
                    Conversion and purchase metrics
                  </Typography>
                </Box>
              </Paper>
            </Box>
          ) : (
            /* Stage 2: KPI Options for Selected Funnel Stage */
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Box
                  sx={{
                    backgroundColor: selectedFunnelStage === 'topOfFunnel' ? '#ff9800' : selectedFunnelStage === 'middleOfFunnel' ? '#e91e63' : '#03a9f4',
                    color: '#fff',
                    px: 1.5,
                    py: 0.75,
                    borderRadius: '4px 4px 0 0',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                >
                  {selectedFunnelStage === 'topOfFunnel' ? 'Top of Funnel' : selectedFunnelStage === 'middleOfFunnel' ? 'Middle of Funnel' : 'Bottom of Funnel'}
                </Box>
                <Box sx={{ border: '1px solid #e0e0e0', borderRadius: '0 0 4px 4px', p: 1.5, backgroundColor: '#fff' }}>
                  {Object.entries(kpiData[selectedFunnelStage]).map(([category, items]) => (
                    items.length > 0 && (
                      <Box key={category} sx={{ mb: 2, '&:last-child': { mb: 0 } }}>
                        <Typography sx={{ fontSize: '11px', fontWeight: 600, color: '#666', mb: 1, textTransform: 'capitalize' }}>
                          {category.replace(/([A-Z])/g, ' $1').trim()}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          {items.map((kpi) => (
                            <FormControlLabel
                              key={kpi}
                              control={
                                <Checkbox
                                  size="small"
                                  checked={selectedKPIs.includes(kpi)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedKPIs([...selectedKPIs, kpi]);
                                    } else {
                                      setSelectedKPIs(selectedKPIs.filter(k => k !== kpi));
                                    }
                                  }}
                                  sx={{
                                    py: 0.25,
                                    '& .MuiSvgIcon-root': { fontSize: 18 },
                                  }}
                                />
                              }
                              label={
                                <Typography sx={{ fontSize: '12px', color: '#333' }}>
                                  {kpi}
                                </Typography>
                              }
                              sx={{ m: 0 }}
                            />
                          ))}
                        </Box>
                      </Box>
                    )
                  ))}
                </Box>
              </Box>
            </Box>
          )}

          {selectedFunnelStage && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 3 }}>
              <Button
                onClick={() => {
                  setSelectedFunnelStage(null);
                  setSelectedKPIs([]);
                }}
                variant="outlined"
                sx={{
                  textTransform: 'none',
                  borderColor: '#e0e0e0',
                  color: '#666',
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (selectedKPIs.length === 0) {
                    return; // Don't proceed if no KPIs selected
                  }

                // Add selected KPIs to plan details
                const kpis = selectedKPIs.map((kpi, index) => ({
                  id: `kpi-${Date.now()}-${index}`,
                  label: `KPI ${index + 1}`,
                  value: kpi,
                  category: 'kpis' as const,
                }));
                
                setPlanDetails((prev) => {
                  // Remove existing KPIs and add new ones
                  const filtered = prev.filter(d => d.category !== 'kpis');
                  return [...filtered, ...kpis];
                });
                
                // Process the answer and mark section as completed
                const answerToShow = `Selected ${selectedKPIs.length} KPIs`;
                setSections((prev) =>
                  prev.map((section) => {
                    if (section.id === 'kpis') {
                      return { ...section, completed: true, answer: answerToShow };
                    }
                    return section;
                  })
                );
                
                setOpenKPIModal(false);
                setSelectedFunnelStage(null);

                // Add user message showing selected KPIs
                const userMessage: Message = {
                  id: Date.now().toString(),
                  role: 'user',
                  content: `Selected KPIs: ${selectedKPIs.join(', ')}`,
                  timestamp: new Date(),
                };
                setMessages((prev) => [...prev, userMessage]);

                // Automatically move to next question
                const kpiSectionIndex = sections.findIndex(s => s.id === 'kpis');
                if (kpiSectionIndex >= 0 && kpiSectionIndex < sections.length - 1) {
                  const nextIndex = kpiSectionIndex + 1;
                  setCurrentQuestionIndex(nextIndex);
                  
                  // Add assistant message with next question
                  setTimeout(() => {
                    const nextMessage: Message = {
                      id: (Date.now() + 1).toString(),
                      role: 'assistant',
                      content: sections[nextIndex].question,
                      timestamp: new Date(),
                    };
                    setMessages((prev) => [...prev, nextMessage]);
                  }, 500);
                } else {
                  // All questions completed
                  const finalMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content: 'Perfect! I have all the information I need. Review your media plan on the right and click "Build Full Campaign" when ready.',
                    timestamp: new Date(),
                  };
                  setMessages((prev) => [...prev, finalMessage]);
                }
              }}
              variant="contained"
              disabled={selectedKPIs.length === 0}
              sx={{
                backgroundColor: '#02b5e7',
                color: '#fff',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#0288d1',
                },
                '&:disabled': {
                  backgroundColor: '#e0e0e0',
                  color: '#999',
                },
              }}
            >
              Add Selected KPIs
            </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default AiAssistantPage;

