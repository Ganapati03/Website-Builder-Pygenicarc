import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import * as Icons from 'lucide-react';
import { BuilderThemeProvider, handleBuilderAction } from './BuilderThemeContext';
import { MOTION_PRESETS, getMotionProps } from './MotionPresets';
import EditableText from './EditableText';

/**
 * HELPER: Calculates contrast text color based on background
 */
const getContrastText = (bgColor, defaultColor = 'var(--builder-text)') => {
  if (!bgColor || typeof bgColor !== 'string' || bgColor.startsWith('var(') || bgColor.length < 4) return defaultColor;
  
  try {
    let r, g, b;
    if (bgColor.startsWith('rgba') || bgColor.startsWith('rgb')) {
      const match = bgColor.match(/\d+/g);
      if (!match || match.length < 3) return defaultColor;
      r = parseInt(match[0]);
      g = parseInt(match[1]);
      b = parseInt(match[2]);
    } else if (bgColor.startsWith('#')) {
      const color = bgColor.replace('#', '');
      const fullColor = color.length === 3 
        ? color.split('').map(c => c + c).join('') 
        : color;
      
      if (fullColor.length !== 6) return defaultColor;
      
      r = parseInt(fullColor.substring(0, 2), 16);
      g = parseInt(fullColor.substring(2, 4), 16);
      b = parseInt(fullColor.substring(4, 6), 16);
    } else {
      return defaultColor;
    }
    
    if (isNaN(r) || isNaN(g) || isNaN(b)) return defaultColor;
    
    // YIQ formula for contrast
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? '#1e293b' : '#f8fafc';
  } catch (e) {
    console.error('Contrast calculation error:', e);
    return defaultColor;
  }
};

/**
 * SECTION COMPONENTS
 * These maps strictly to the 'type' field in the JSON schema.
 */

// 1. Navigation Section
const NavbarSection = ({ settings, styles = {}, animation, isMobile, onInlineEdit }) => {
  const motionProps = getMotionProps(animation, styles.animation);
  
  return (
  <motion.nav 
    initial={motionProps.initial}
    whileInView={motionProps.whileInView}
    transition={motionProps.transition}
    viewport={{ once: false, amount: 0.1 }}
    style={{ 
      backgroundColor: styles.backgroundColor || 'var(--builder-background)',
      paddingTop:    styles.paddingTop    || styles.paddingY || '1rem',
      paddingBottom: styles.paddingBottom || styles.paddingY || '1rem',
      paddingLeft:   styles.paddingLeft   || '2rem',
      paddingRight:  styles.paddingRight  || '2rem',
      fontFamily: styles.fontFamily || 'var(--builder-font-family)',
      position: styles.sticky ? 'sticky' : 'relative',
      top: 0,
      zIndex: 100,
      borderBottom: '1px solid rgba(0,0,0,0.1)'
    }}
    className="flex items-center justify-between shadow-sm"
  >
    <div className={`font-black tracking-tighter ${isMobile ? 'text-lg' : 'text-xl'}`} style={{ color: 'var(--builder-primary)' }}>
      <EditableText
        value={settings.logoText}
        onSave={(val) => onInlineEdit?.('logoText', val)}
        disabled={!onInlineEdit}
        tag="span"
        placeholder="Logo"
      />
    </div>
    <div className={`flex items-center ${isMobile ? 'gap-3' : 'gap-6'}`}>
      {settings.links?.map((link, i) => (
        (!isMobile || i < 2 || link.isButton) && (
          <a 
            key={link.id || i} 
            href={link.type === 'url' ? link.href : link.type === 'page' ? `?page=${link.href}` : `#${link.targetId}`}
            onClick={(e) => {
              handleBuilderAction(link.action || { 
                type: link.type === 'scroll' ? 'scroll' : link.type === 'page' ? 'page' : 'link',
                payload: link.type === 'scroll' ? link.targetId : link.href
              }, e);
            }}
            className={`${isMobile ? 'text-[10px]' : 'text-sm'} font-bold transition-all ${
              link.isButton 
                ? 'text-white px-4 py-1.5 rounded-lg hover:scale-105 active:scale-95 shadow-md hover:shadow-lg' 
                : 'hover:text-sky-500'
            }`}
            style={{
              ...(link.isButton 
                ? { backgroundColor: link.color || 'var(--builder-primary)' } 
                : { color: link.color || styles.textColor || 'var(--builder-text)' })
            }}
          >
            <EditableText
              value={link.label}
              onSave={(val) => onInlineEdit?.('links', val, i, 'label')}
              disabled={!onInlineEdit}
              tag="span"
              placeholder="Link"
            />
          </a>
        )
      ))}
    </div>
  </motion.nav>
);
};

// 2. Hero Section
const HeroSection = ({ settings, styles = {}, animation, isMobile, onInlineEdit }) => {
  const motionProps = getMotionProps(animation, styles.animation);

  const bg = styles.bgMode === 'gradient'
    ? `linear-gradient(135deg, ${styles.gradientFrom || '#6366f1'}, ${styles.gradientTo || '#ec4899'})`
    : styles.bgGradient || styles.backgroundColor || 'var(--builder-background)';

  const headingDecoration = styles.fontUnderline ? 'underline' : 'none';
  const fontFamily = styles.fontFamily || 'var(--builder-font-family)';

  const defaultText = getContrastText(styles.backgroundColor);

  const headingStyle = {
    color: styles.textColor || defaultText,
    fontSize: isMobile ? '2.5rem' : (styles.headingSize || '5rem'),
    fontWeight: styles.fontBold === false ? '400' : '900',
    fontStyle: styles.fontItalic ? 'italic' : 'normal',
    textDecoration: headingDecoration,
    lineHeight: 1.1,
    letterSpacing: '-0.03em',
    marginBottom: '1.5rem',
    fontFamily: fontFamily
  };

  const subheadingStyle = {
    color: styles.textColor || (defaultText === '#f8fafc' ? '#94a3b8' : '#64748b'), 
    fontFamily: fontFamily
  };

  return (
    <motion.section 
      initial={motionProps.initial}
      whileInView={motionProps.whileInView}
      transition={motionProps.transition}
      viewport={{ once: false, amount: 0.1 }}
      style={{ 
        paddingTop:    isMobile ? '40px' : (styles.paddingTop    || '80px'),
        paddingBottom: isMobile ? '40px' : (styles.paddingBottom || '80px'),
        paddingLeft:   isMobile ? '1.5rem' : (styles.paddingLeft   || '2rem'),
        paddingRight:  isMobile ? '1.5rem' : (styles.paddingRight  || '2rem'),
        background: bg,
        textAlign: styles.align || 'left',
        fontFamily: fontFamily,
        color: styles.textColor || 'inherit'
      }}
      className={`grid ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2'} items-center gap-12`}
    >
      <div className={styles.align === 'center' || isMobile ? 'md:col-span-2' : ''}>
        {settings.items?.length > 0 ? (
          // Dynamic Content Blocks
          settings.items.map((item, i) => {
            if (item.type === 'heading') {
              return (
                <EditableText
                  key={item.id}
                  tag="h1"
                  value={item.text}
                  onSave={(val) => onInlineEdit?.('items', val, i, 'text')}
                  disabled={!onInlineEdit}
                  style={{...headingStyle, color: item.color || headingStyle.color}}
                  placeholder="Heading text…"
                />
              );
            }
            if (item.type === 'subheading') {
              return (
                <EditableText
                  key={item.id}
                  tag="p"
                  value={item.text}
                  onSave={(val) => onInlineEdit?.('items', val, i, 'text')}
                  disabled={!onInlineEdit}
                  className="text-xl font-medium mb-10 max-w-2xl mx-auto md:mx-0"
                  style={{...subheadingStyle, color: item.color || subheadingStyle.color}}
                  placeholder="Subheading text…"
                  multiline
                />
              );
            }
            if (item.type === 'button') {
              return (
                <div key={item.id} className={`inline-flex mb-4 mr-4 ${styles.align === 'center' ? 'justify-center' : ''}`}>
                  <button 
                    onClick={(e) => handleBuilderAction(item.action || { type: 'link', payload: item.href}, e)}
                    className={`px-8 py-4 rounded-2xl font-bold transition-all active:scale-95 shadow-xl ${
                      item.style === 'outline' 
                        ? 'bg-transparent border-2 border-current hover:bg-slate-50' 
                        : item.style === 'ghost'
                        ? 'bg-transparent hover:bg-slate-50'
                        : 'text-white'
                    }`}
                    style={{ 
                      backgroundColor: item.style === 'primary' ? 'var(--builder-primary)' : 'transparent',
                      color: item.style === 'primary' ? 'white' : (item.color || styles.textColor || 'var(--builder-text)'),
                      borderColor: item.style === 'outline' ? 'var(--builder-primary)' : 'transparent',
                      fontFamily
                    }}
                  >
                    {item.text}
                  </button>
                </div>
              );
            }
            return null;
          })
        ) : (
          // Legacy Fallback
          <>
            <EditableText
              tag="h1"
              value={settings.headline}
              onSave={(val) => onInlineEdit?.('headline', val)}
              disabled={!onInlineEdit}
              style={headingStyle}
              placeholder="Headline…"
            />
            <EditableText
              tag="p"
              value={settings.subheadline}
              onSave={(val) => onInlineEdit?.('subheadline', val)}
              disabled={!onInlineEdit}
              className="text-xl font-medium mb-10 max-w-2xl mx-auto md:mx-0"
              style={subheadingStyle}
              placeholder="Subheadline…"
              multiline
            />
            <div className={`flex flex-wrap gap-4 ${styles.align === 'center' ? 'justify-center' : 'justify-start'}`}>
              {(settings.buttons || (settings.ctaText ? [{ id: 'cta-legacy', label: settings.ctaText, action: settings.ctaAction, style: 'primary' }] : [])).map((btn) => (
                <button 
                  key={btn.id}
                  onClick={(e) => handleBuilderAction(btn.action, e)}
                  className={`px-8 py-4 rounded-2xl font-bold transition-all active:scale-95 shadow-xl ${
                    btn.style === 'outline' 
                      ? 'bg-transparent border-2 border-current hover:bg-slate-50' 
                      : btn.style === 'ghost'
                      ? 'bg-transparent hover:bg-slate-50'
                      : 'text-white'
                  }`}
                  style={{ 
                    backgroundColor: btn.style === 'primary' ? 'var(--builder-primary)' : 'transparent',
                    color: btn.style === 'primary' ? 'white' : (styles.textColor || 'var(--builder-text)'),
                    borderColor: btn.style === 'outline' ? 'var(--builder-primary)' : 'transparent',
                    fontFamily
                  }}
                >
                  <EditableText
                    value={btn.label || btn.text}
                    onSave={(val) => onInlineEdit?.('ctaText', val)}
                    disabled={!onInlineEdit}
                    tag="span"
                    placeholder="Button"
                  />
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      {settings.image && styles.align !== 'center' && (
        <div className="relative">
          <img src={settings.image} alt="Hero" className="rounded-[2rem] shadow-2xl" />
        </div>
      )}
    </motion.section>
  );
};

// 3. Pricing Section
const PricingSection = ({ settings, styles = {}, animation, isMobile, onInlineEdit }) => {
  const motionProps = getMotionProps(animation, styles.animation);

  const bg = styles.bgMode === 'gradient'
    ? `linear-gradient(135deg, ${styles.gradientFrom || '#6366f1'}, ${styles.gradientTo || '#ec4899'})`
    : styles.backgroundColor || '#f8fafc';
  const defaultText = getContrastText(styles.backgroundColor);

  return (
  <motion.section 
    initial={motionProps.initial}
    whileInView={motionProps.whileInView}
    transition={motionProps.transition}
    viewport={{ once: false, amount: 0.1 }}
    style={{
      paddingTop:    styles.paddingTop    || '5rem',
      paddingBottom: styles.paddingBottom || '5rem',
      paddingLeft:   styles.paddingLeft   || '2rem',
      paddingRight:  styles.paddingRight  || '2rem',
      background: bg,
      textAlign: styles.align || 'center',
      fontFamily: styles.fontFamily || 'var(--builder-font-family)'
    }}
  >
      <h2
        style={{
          color: styles.textColor || defaultText,
          fontSize: isMobile ? '1.75rem' : (styles.headingSize || '2.5rem'),
          fontWeight: styles.fontBold === false ? '400' : '900',
          fontStyle: styles.fontItalic ? 'italic' : 'normal',
          textDecoration: styles.fontUnderline ? 'underline' : 'none',
          marginBottom: '3rem',
          fontFamily: styles.fontFamily || 'var(--builder-font-family)'
        }}
      >
      <EditableText
        value={settings.title}
        onSave={(val) => onInlineEdit?.('title', val)}
        disabled={!onInlineEdit}
        tag="span"
        placeholder="Section Title…"
      />
    </h2>
    <div className={`grid ${isMobile ? 'grid-cols-1' : 'md:grid-cols-3'} gap-8`}>
      {settings.plans?.map((plan, i) => (
        <div key={plan.id || i} className="bg-white p-8 rounded-[2rem] shadow-lg border border-slate-100 flex flex-col text-left" style={plan.color ? { borderColor: plan.color, borderWidth: '2px' } : {}}>
          <EditableText
            tag="h4"
            value={plan.name}
            onSave={(val) => onInlineEdit?.('plans', val, i, 'name')}
            disabled={!onInlineEdit}
            className="font-bold uppercase text-xs tracking-widest mb-2"
            style={{ color: plan.color || styles.textColor || '#64748b' }}
            placeholder="Plan name…"
          />
          <div className="text-4xl font-black mb-6" style={{ color: plan.color || styles.textColor || defaultText }}>
            {plan.price}<span className="text-sm opacity-50">/mo</span>
          </div>
          <ul className="text-sm space-y-3 mb-8 text-left" style={{ color: styles.textColor || (defaultText === '#f8fafc' ? '#94a3b8' : '#475569') }}>
            {plan.features.map((f, j) => <li key={j}>✓ {f}</li>)}
          </ul>
          <button 
            onClick={(e) => handleBuilderAction(plan.action, e)}
            className="mt-auto py-3 rounded-xl font-bold border-2 transition-colors hover:bg-slate-50" 
            style={{ borderColor: 'var(--builder-primary)', color: 'var(--builder-primary)' }}
          >
            Choose Plan
          </button>
        </div>
      ))}
    </div>
  </motion.section>
);
};

// 4. Features Section
const FeaturesSection = ({ settings, styles = {}, animation, isMobile, onInlineEdit }) => {
  const motionProps = getMotionProps(animation, styles.animation);

  const bg = styles.bgMode === 'gradient'
    ? `linear-gradient(135deg, ${styles.gradientFrom || '#6366f1'}, ${styles.gradientTo || '#ec4899'})`
    : styles.backgroundColor || '#ffffff';
  const defaultText = getContrastText(styles.backgroundColor);

  return (
    <motion.section 
      initial={motionProps.initial}
      whileInView={motionProps.whileInView}
      transition={motionProps.transition}
      viewport={{ once: false, amount: 0.1 }}
      style={{
        paddingTop:    styles.paddingTop    || '6rem',
        paddingBottom: styles.paddingBottom || '6rem',
        paddingLeft:   styles.paddingLeft   || '2rem',
        paddingRight:  styles.paddingRight  || '2rem',
        background: bg,
        textAlign: styles.align || 'left',
        fontFamily: styles.fontFamily || 'var(--builder-font-family)'
      }}
    >
      <div className="text-center mb-16">
        <h2
          style={{
            color: styles.textColor || defaultText,
            fontSize: isMobile ? '1.75rem' : (styles.headingSize || '2.5rem'),
            fontWeight: styles.fontBold === false ? '400' : '900',
            fontStyle: styles.fontItalic ? 'italic' : 'normal',
            textDecoration: styles.fontUnderline ? 'underline' : 'none',
            marginBottom: '1rem',
            fontFamily: styles.fontFamily || 'var(--builder-font-family)'
          }}
        >
          <EditableText
            value={settings.title}
            onSave={(val) => onInlineEdit?.('title', val)}
            disabled={!onInlineEdit}
            tag="span"
            placeholder="Features Title…"
          />
        </h2>
        <p className={`opacity-60 mx-auto ${isMobile ? 'text-sm' : 'text-lg max-w-2xl'}`} style={{ color: styles.textColor || 'inherit' }}>
          <EditableText
            value={settings.subtitle}
            onSave={(val) => onInlineEdit?.('subtitle', val)}
            disabled={!onInlineEdit}
            tag="span"
            placeholder="Subtitle…"
            multiline
          />
        </p>
      </div>
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'md:grid-cols-3'} gap-6`}>
        {settings.items?.map((item, i) => {
          const isBento = settings.layout === 'bento';
          const spanClass = (!isMobile && isBento) 
            ? (item.span === '2' ? 'md:col-span-2' : item.span === '3' ? 'md:col-span-3' : '') 
            : '';

          return (
            <div 
              key={item.id || i} 
              className={`group text-left transition-all duration-500 overflow-hidden ${spanClass} ${
                isBento 
                  ? 'bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl hover:-translate-y-1' 
                  : item.action ? 'cursor-pointer p-4 -m-4 rounded-3xl' : ''
              }`}
              style={isBento && item.color ? { borderColor: `${item.color}20` } : {}}
              onClick={(e) => item.action && handleBuilderAction(item.action, e)}
            >
              <div 
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  isBento ? 'mb-8' : 'mb-6'
                } ${
                  isBento ? 'bg-slate-50 text-slate-400 group-hover:bg-slate-900 group-hover:text-white' : 'bg-sky-50 text-sky-500 group-hover:bg-sky-500 group-hover:text-white'
                }`}
                style={item.color && !isBento ? { backgroundColor: `${item.color}15`, color: item.color } : {}}
              >
                 <span className="text-xl">✨</span>
              </div>
              <EditableText
                tag="h4"
                value={item.title}
                onSave={(val) => onInlineEdit?.('items', val, i, 'title')}
                disabled={!onInlineEdit}
                className={`font-bold mb-3 ${isBento ? 'text-2xl tracking-tight' : 'text-xl'}`}
                style={{ color: item.color || styles.textColor || defaultText }}
                placeholder="Feature title…"
              />
              <EditableText
                tag="p"
                value={item.description}
                onSave={(val) => onInlineEdit?.('items', val, i, 'description')}
                disabled={!onInlineEdit}
                className={`${isBento ? 'text-base opacity-70' : 'text-sm opacity-60'} leading-relaxed`}
                style={{ color: styles.textColor || (defaultText === '#f8fafc' ? '#cbd5e1' : '#64748b') }}
                placeholder="Feature description…"
                multiline
              />
              
              {isBento && item.action && (
                <div className="mt-8 flex items-center gap-2 text-sm font-black text-sky-500 group-hover:gap-3 transition-all">
                  Explore Project <Icons.ArrowRight size={14} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </motion.section>
  );
};

// 5. FAQ Section
const FAQSection = ({ settings, styles = {}, animation, isMobile, onInlineEdit }) => {
  const motionProps = getMotionProps(animation, styles.animation);

  const bg = styles.bgMode === 'gradient'
    ? `linear-gradient(135deg, ${styles.gradientFrom || '#6366f1'}, ${styles.gradientTo || '#ec4899'})`
    : styles.backgroundColor || '#f8fafc';
  const defaultText = getContrastText(styles.backgroundColor);

  return (
    <motion.section 
      initial={motionProps.initial}
      whileInView={motionProps.whileInView}
      transition={motionProps.transition}
      viewport={{ once: false, amount: 0.1 }}
      style={{
        paddingTop:    styles.paddingTop    || '6rem',
        paddingBottom: styles.paddingBottom || '6rem',
        paddingLeft:   styles.paddingLeft   || '2rem',
        paddingRight:  styles.paddingRight  || '2rem',
        background: bg,
        fontFamily: styles.fontFamily || 'var(--builder-font-family)'
      }}
    >
      <div className="max-w-3xl mx-auto">
        <h2
          style={{
            color: styles.textColor || defaultText,
            fontSize: isMobile ? '1.5rem' : (styles.headingSize || '1.875rem'),
            fontWeight: styles.fontBold === false ? '400' : '900',
            fontStyle: styles.fontItalic ? 'italic' : 'normal',
            textDecoration: styles.fontUnderline ? 'underline' : 'none',
            textAlign: 'center',
            marginBottom: '3rem',
            fontFamily: styles.fontFamily || 'var(--builder-font-family)'
          }}
        >
          <EditableText
            value={settings.title}
            onSave={(val) => onInlineEdit?.('title', val)}
            disabled={!onInlineEdit}
            tag="span"
            placeholder="FAQ Title…"
          />
        </h2>
        <div className="space-y-4">
          {settings.faqs?.map((faq, i) => (
            <div key={faq.id || i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-left" style={faq.color ? { borderColor: faq.color } : {}}>
              <EditableText
                tag="h4"
                value={faq.question}
                onSave={(val) => onInlineEdit?.('faqs', val, i, 'question')}
                disabled={!onInlineEdit}
                className="font-bold text-lg mb-2"
                style={{ color: faq.color || styles.textColor || defaultText }}
                placeholder="Question…"
              />
              <EditableText
                tag="p"
                value={faq.answer}
                onSave={(val) => onInlineEdit?.('faqs', val, i, 'answer')}
                disabled={!onInlineEdit}
                className="text-sm leading-relaxed"
                style={{ color: styles.textColor || (defaultText === '#f8fafc' ? '#94a3b8' : '#64748b') }}
                placeholder="Answer…"
                multiline
              />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// 6. Testimonials Section
const TestimonialsSection = ({ settings, styles = {}, animation, isMobile, onInlineEdit }) => {
  const motionProps = getMotionProps(animation, styles.animation);

  const bg = styles.bgMode === 'gradient'
    ? `linear-gradient(135deg, ${styles.gradientFrom || '#6366f1'}, ${styles.gradientTo || '#ec4899'})`
    : styles.backgroundColor || '#ffffff';
  const defaultText = getContrastText(styles.backgroundColor);

  return (
    <motion.section 
      initial={motionProps.initial}
      whileInView={motionProps.whileInView}
      transition={motionProps.transition}
      viewport={{ once: false, amount: 0.1 }}
      style={{
        paddingTop:    styles.paddingTop    || '6rem',
        paddingBottom: styles.paddingBottom || '6rem',
        paddingLeft:   styles.paddingLeft   || '2rem',
        paddingRight:  styles.paddingRight  || '2rem',
        background: bg,
        fontFamily: styles.fontFamily || 'var(--builder-font-family)'
      }}
    >
      <h2
        style={{
          color: styles.textColor || defaultText,
          fontSize: styles.headingSize || '1.875rem',
          fontWeight: styles.fontBold === false ? '400' : '900',
          fontStyle: styles.fontItalic ? 'italic' : 'normal',
          textDecoration: styles.fontUnderline ? 'underline' : 'none',
          textAlign: 'center',
          marginBottom: '4rem',
          fontFamily: styles.fontFamily || 'var(--builder-font-family)'
        }}
      >
        <EditableText
          value={settings.title}
          onSave={(val) => onInlineEdit?.('title', val)}
          disabled={!onInlineEdit}
          tag="span"
          placeholder="Testimonials Title…"
        />
      </h2>
      <div className={`grid ${isMobile ? 'grid-cols-1' : 'md:grid-cols-3'} gap-8 max-w-6xl mx-auto`}>
        {settings.testimonials?.map((t, i) => (
          <div key={t.id || i} className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 flex flex-col text-left" style={t.color ? { borderColor: t.color, borderWidth: '2px' } : {}}>
            <EditableText
              tag="p"
              value={t.content}
              onSave={(val) => onInlineEdit?.('testimonials', val, i, 'content')}
              disabled={!onInlineEdit}
              className="italic mb-8 leading-relaxed"
              style={{ color: t.color || styles.textColor || (defaultText === '#f8fafc' ? '#94a3b8' : '#475569') }}
              placeholder="Testimonial content…"
              multiline
            />
            <div className="mt-auto flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-200 shrink-0 overflow-hidden">
                <img src={t.avatar} alt={t.author} className="w-full h-full object-cover" />
              </div>
              <div>
                <EditableText
                  tag="h5"
                  value={t.author}
                  onSave={(val) => onInlineEdit?.('testimonials', val, i, 'author')}
                  disabled={!onInlineEdit}
                  className="font-bold text-sm"
                  style={{ color: t.color || styles.textColor || defaultText }}
                  placeholder="Author name…"
                />
                <EditableText
                  tag="p"
                  value={t.role}
                  onSave={(val) => onInlineEdit?.('testimonials', val, i, 'role')}
                  disabled={!onInlineEdit}
                  className="text-xs opacity-50"
                  style={{ color: styles.textColor || 'inherit' }}
                  placeholder="Role…"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

// 7. Chips Section
const ChipsSection = ({ settings, styles = {}, animation, isMobile }) => {
  const motionProps = getMotionProps(animation, styles.animation);

  return (
    <motion.section 
      initial={motionProps.initial}
      whileInView={motionProps.whileInView}
      transition={motionProps.transition}
      viewport={{ once: false, amount: 0.1 }}
      className={`flex flex-wrap justify-center ${isMobile ? 'gap-2' : 'gap-3'}`}
      style={{
        paddingTop:    isMobile ? '2rem' : (styles.paddingTop    || '3rem'),
        paddingBottom: isMobile ? '2rem' : (styles.paddingBottom || '3rem'),
        paddingLeft:   isMobile ? '1rem' : (styles.paddingLeft   || '2rem'),
        paddingRight:  isMobile ? '1rem' : (styles.paddingRight  || '2rem'),
        fontFamily: styles.fontFamily || 'var(--builder-font-family)',
        backgroundColor: styles.backgroundColor || 'transparent'
      }}
    >
      {settings.chips?.map((chip, i) => (
        <button 
          key={chip.id || i}
          onClick={(e) => handleBuilderAction(chip.action, e)}
          className={`rounded-full border transition-all hover:scale-105 active:scale-95 ${isMobile ? 'px-4 py-1.5 text-xs font-bold' : 'px-5 py-2.5 text-sm font-bold'}`}
          style={{ 
            backgroundColor: chip.isActive ? 'var(--builder-primary)' : 'rgba(255,255,255,0.05)',
            color: chip.isActive ? 'white' : (styles.textColor || 'var(--builder-text)'),
            borderColor: chip.isActive ? 'var(--builder-primary)' : 'rgba(255,255,255,0.1)',
            fontFamily: styles.fontFamily || 'var(--builder-font-family)'
          }}
        >
          {chip.label}
        </button>
      ))}
    </motion.section>
  );
};
// 8. Icon Section (Standalone)
const IconSection = ({ settings, styles = {}, animation, isMobile }) => {
  const iconSource = Icons?.icons || Icons || {};
  const IconComponent = iconSource[settings.iconName];
  if (!IconComponent) return null;

  return (
    <div 
      onClick={(e) => handleBuilderAction(settings.action, e)}
      className={settings.action ? 'cursor-pointer hover:scale-110 active:scale-95 transition-all' : ''}
      style={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop:    isMobile ? '1.5rem' : '2.5rem',
        paddingBottom: isMobile ? '1.5rem' : '2.5rem',
        paddingLeft:   isMobile ? '1rem' : '2rem',
        paddingRight:  isMobile ? '1rem' : '2rem',
      }}
    >
      <IconComponent 
        size={isMobile ? (styles.size ? styles.size * 0.7 : 32) : (styles.size || 48)} 
        color={styles.color || 'var(--builder-primary)'} 
        style={{
          filter: styles.shadow ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' : 'none',
          transform: `rotate(${styles.rotate || 0}deg)`
        }}
      />
    </div>
  );
};
// 10. Contact Section
const ContactSection = ({ settings, styles = {}, animation, isMobile, onInlineEdit }) => {
  const motionProps = getMotionProps(animation, styles.animation);
  const bg = styles.backgroundColor || '#ffffff';
  const defaultText = getContrastText(styles.backgroundColor);

  return (
    <motion.section 
      initial={motionProps.initial}
      whileInView={motionProps.whileInView}
      transition={motionProps.transition}
      viewport={{ once: true }}
      className="py-24 px-8"
      style={{ background: bg, fontFamily: styles.fontFamily || 'var(--builder-font-family)' }}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <EditableText
            tag="h2"
            value={settings.title || "Let's work together"}
            onSave={(val) => onInlineEdit?.('title', val)}
            disabled={!onInlineEdit}
            className="text-4xl font-black mb-6"
            style={{ color: styles.textColor || defaultText }}
            placeholder="Contact Title…"
          />
          <EditableText
            tag="p"
            value={settings.subtitle || "Have a project in mind? Drop me a message and let's turn your ideas into reality."}
            onSave={(val) => onInlineEdit?.('subtitle', val)}
            disabled={!onInlineEdit}
            className="text-lg opacity-60 mb-10"
            style={{ color: styles.textColor || 'inherit' }}
            placeholder="Contact Subtitle…"
            multiline
          />
          
          <div className="space-y-6">
            {settings.info?.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-500">
                   {Icons[item.icon] ? React.createElement(Icons[item.icon], { size: 20 }) : '📍'}
                </div>
                <div>
                   <p className="text-xs font-black uppercase tracking-widest opacity-60" style={{ color: styles.labelColor || styles.textColor || (defaultText === '#f8fafc' ? '#94a3b8' : 'inherit') }}>{item.label}</p>
                   <p className="font-bold" style={{ color: styles.textColor || (defaultText === '#f8fafc' ? '#f8fafc' : '#0f172a') }}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-xl">
           <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                     <label className="text-xs font-black uppercase opacity-60 ml-1" style={{ color: styles.labelColor || 'var(--builder-text)' }}>Name</label>
                     <input type="text" placeholder="John Doe" className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none transition-all" style={{ color: 'var(--builder-text)' }} />
                  </div>
                  <div className="space-y-2">
                     <label className="text-xs font-black uppercase opacity-60 ml-1" style={{ color: styles.labelColor || 'var(--builder-text)' }}>Email</label>
                     <input type="email" placeholder="john@example.com" className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none transition-all" style={{ color: 'var(--builder-text)' }} />
                  </div>
              </div>
              <div className="space-y-2">
                  <label className="text-xs font-black uppercase opacity-60 ml-1" style={{ color: styles.labelColor || 'var(--builder-text)' }}>Message</label>
                  <textarea rows="4" placeholder="Tell me about your project..." className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none transition-all resize-none" style={{ color: 'var(--builder-text)' }}></textarea>
              </div>
              <button 
                className="w-full py-5 text-white rounded-2xl font-black text-lg shadow-lg hover:brightness-110 transition-all active:scale-[0.98]"
                style={{ 
                  backgroundColor: settings.buttonColor || 'var(--builder-primary)',
                  boxShadow: `0 10px 15px -3px ${(settings.buttonColor || '#3b82f6')}40`
                }}
                onClick={(e) => handleBuilderAction(settings.action, e)}
              >
                <EditableText
                  value={settings.buttonText || "Send Message"}
                  onSave={(val) => onInlineEdit?.('buttonText', val)}
                  disabled={!onInlineEdit}
                  tag="span"
                  placeholder="Button Text"
                />
              </button>
           </form>
        </div>
      </div>
    </motion.section>
  );
};

// 11. Stats Section
const StatsSection = ({ settings, styles = {}, animation, isMobile, onInlineEdit }) => {
  const motionProps = getMotionProps(animation, styles.animation);

  const defaultText = getContrastText(styles.backgroundColor);

  return (
    <motion.section 
      initial={motionProps.initial}
      whileInView={motionProps.whileInView}
      transition={motionProps.transition}
      viewport={{ once: true }}
      className="py-16 px-8"
      style={{ backgroundColor: styles.backgroundColor || 'transparent', fontFamily: styles.fontFamily || 'var(--builder-font-family)' }}
    >
      <div className={`grid ${isMobile ? 'grid-cols-2' : 'md:grid-cols-4'} gap-8 max-w-6xl mx-auto`}>
         {settings.stats?.map((stat, i) => (
           <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-black mb-2" style={{ color: styles.accentColor || 'var(--builder-primary)' }}>
                <EditableText
                  value={stat.value}
                  onSave={(val) => onInlineEdit?.('stats', val, i, 'value')}
                  disabled={!onInlineEdit}
                  tag="span"
                  placeholder="0"
                />
              </div>
              <p className="text-xs font-black uppercase tracking-widest opacity-60" style={{ color: styles.textColor || (defaultText === '#f8fafc' ? '#94a3b8' : 'inherit') }}>
                <EditableText
                  value={stat.label}
                  onSave={(val) => onInlineEdit?.('stats', val, i, 'label')}
                  disabled={!onInlineEdit}
                  tag="span"
                  placeholder="Label"
                />
              </p>
           </div>
         ))}
      </div>
    </motion.section>
  );
};

// 12. Image / Media Section
// Respects settings.mediaType: 'image' | 'video' (defaults to 'image' for backward compatibility)
const ImageSection = ({ settings, styles = {}, animation, isMobile }) => {
  const motionProps = getMotionProps(animation, styles.animation);
  const isVideo = settings.mediaType === 'video';

  return (
    <motion.div
      initial={motionProps.initial}
      whileInView={motionProps.whileInView}
      transition={motionProps.transition}
      onClick={(e) => handleBuilderAction(settings.action, e)}
      className={settings.action ? 'cursor-pointer' : ''}
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: styles.padding || 0,
      }}
    >
      {isVideo ? (
        <video
          key={settings.url}
          src={settings.url}
          controls={settings.controls !== false}
          autoPlay={settings.autoPlay}
          loop={settings.loop}
          muted={settings.muted !== false}
          poster={settings.poster}
          style={{
            width: isMobile ? '100%' : (styles.width || '600px'),
            height: styles.height || 'auto',
            borderRadius: styles.borderRadius || '24px',
            transform: `rotate(${styles.rotate || 0}deg)`,
            boxShadow: styles.shadow ? '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)' : 'none',
          }}
          className="max-w-full shadow-2xl"
        />
      ) : (
        <img
          src={settings.url || 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format'}
          alt={settings.alt || 'Visual'}
          style={{
            width: isMobile ? '100%' : (styles.width || '400px'),
            height: styles.height || 'auto',
            borderRadius: styles.borderRadius || '24px',
            boxShadow: styles.shadow ? '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)' : 'none',
            transform: `rotate(${styles.rotate || 0}deg)`,
            objectFit: styles.objectFit || 'cover'
          }}
          className="max-w-full transition-all hover:scale-[1.02]"
        />
      )}
    </motion.div>
  );
};

// 13. Video Section
const VideoSection = ({ settings, styles = {}, animation, isMobile }) => {
  const motionProps = getMotionProps(animation, styles.animation);

  return (
    <motion.div 
      initial={motionProps.initial}
      whileInView={motionProps.whileInView}
      transition={motionProps.transition}
      style={{
       display: 'flex',
       justifyContent: 'center',
       padding: styles.padding || 0,
    }}>
      <video 
        src={settings.url} 
        controls={settings.controls !== false}
        autoPlay={settings.autoPlay}
        loop={settings.loop}
        muted={settings.muted}
        poster={settings.poster}
        style={{
          width: isMobile ? '100%' : (styles.width || '600px'),
          height: styles.height || 'auto',
          borderRadius: styles.borderRadius || '24px',
          transform: `rotate(${styles.rotate || 0}deg)`,
          boxShadow: styles.shadow ? '0 20px 25px -5px rgba(0,0,0,0.1)' : 'none',
        }}
        className="max-w-full shadow-2xl"
      />
    </motion.div>
  );
};

// 8. Timeline Section
const TimelineSection = ({ settings, styles = {}, animation, isMobile, onInlineEdit }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const defaultText = getContrastText(styles.backgroundColor);
  
  return (
    <motion.section 
      ref={containerRef}
      className={`relative py-24 px-8 overflow-hidden`}
      style={{
        background: styles.backgroundColor || '#ffffff',
        fontFamily: styles.fontFamily || 'var(--builder-font-family)'
      }}
    >
      <div className="max-w-4xl mx-auto relative">
        <div className="text-center mb-20">
          <EditableText
            tag="h2"
            value={settings.title || 'My Journey'}
            onSave={(val) => onInlineEdit?.('title', val)}
            disabled={!onInlineEdit}
            className="text-4xl font-black mb-4"
            style={{ color: styles.textColor || defaultText }}
            placeholder="Timeline Title…"
          />
          <EditableText
            tag="p"
            value={settings.subtitle || 'A timeline of the professional milestones that shaped my career.'}
            onSave={(val) => onInlineEdit?.('subtitle', val)}
            disabled={!onInlineEdit}
            className="opacity-60 max-w-lg mx-auto"
            style={{ color: styles.textColor || 'inherit' }}
            placeholder="Timeline Subtitle…"
            multiline
          />
        </div>

        {/* The Animated Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-40 bottom-0 w-1 bg-slate-100 rounded-full hidden md:block">
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute inset-0 bg-sky-500 rounded-full"
          />
        </div>

        <div className="space-y-24 relative">
          {settings.milestones?.map((m, i) => (
            <motion.div 
              key={m.id || i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className={`flex-1 w-full ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                <div className={`inline-block px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-4 ${
                  i % 2 === 0 ? 'bg-sky-50 text-sky-600' : 'bg-emerald-50 text-emerald-600'
                }`}>
                  {m.date}
                </div>
                <EditableText
                  tag="h3"
                  value={m.title}
                  onSave={(val) => onInlineEdit?.('milestones', val, i, 'title')}
                  disabled={!onInlineEdit}
                  className="text-2xl font-black mb-3"
                  style={{ color: styles.textColor || defaultText }}
                  placeholder="Milestone title…"
                />
                <EditableText
                  tag="p"
                  value={m.description}
                  onSave={(val) => onInlineEdit?.('milestones', val, i, 'description')}
                  disabled={!onInlineEdit}
                  className="text-slate-500 leading-relaxed text-sm md:text-base max-w-md ml-auto mr-auto md:ml-0 md:mr-0"
                  style={{ 
                    color: styles.textColor || (defaultText === '#f8fafc' ? '#94a3b8' : '#64748b'),
                    marginLeft: i % 2 === 0 ? 'auto' : '0',
                    marginRight: i % 2 === 0 ? '0' : 'auto'
                  }}
                  placeholder="Milestone description…"
                  multiline
                />
              </div>

              {/* Center Dot */}
              <div className="relative z-10 w-12 h-12 flex items-center justify-center shrink-0">
                <div className="w-4 h-4 rounded-full bg-white border-4 border-sky-500 shadow-xl" />
              </div>

              <div className="flex-1 w-full hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
/**
 * RENDERER COMPONENT
 * Dispatches sections based on their type.
 */
export const SECTION_MAP = {
  Navbar: NavbarSection,
  Hero: HeroSection,
  Pricing: PricingSection,
  Features: FeaturesSection,
  FAQ: FAQSection,
  Testimonials: TestimonialsSection,
  Chips: ChipsSection,
  Icon: IconSection,
  Timeline: TimelineSection,
  Contact: ContactSection,
  Stats: StatsSection,
  Image: ImageSection,
  Video: VideoSection,
  // 'Media' is the category key from BlockPresets — alias it to ImageSection
  // which already handles both image & video via settings.mediaType
  Media: ImageSection,
};

export { 
  NavbarSection, 
  HeroSection, 
  PricingSection, 
  FeaturesSection, 
  FAQSection, 
  TestimonialsSection, 
  ChipsSection,
  IconSection,
  TimelineSection,
  ContactSection,
  StatsSection,
  ImageSection,
  VideoSection
};

/** 
 * AUTO-CORRECTION LOGIC: Normalizes block styles for vertical flow.
 * Removes absolute positioning and enforces consistent vertical padding.
 */
const normalizeSectionStyles = (section) => {
  const s = { ...section.styles };
  
  // 1. Remove absolute positioning
  delete s.position;
  delete s.top;
  delete s.left;
  
  // 2. Remove manual margins that cause gaps
  delete s.marginTop;
  delete s.marginBottom;
  delete s.mt;
  delete s.mb;
  
  // 3. Normalize padding (py-12 or py-20)
  // Default to py-20 (80px) for a premium look, or keep user preference if it's already 48px/80px
  const pt = parseInt(s.paddingTop);
  if (isNaN(pt)) {
    s.paddingTop = '80px';
  } else if (pt < 60) {
    s.paddingTop = '48px'; // py-12
  } else {
    s.paddingTop = '80px'; // py-20
  }

  const pb = parseInt(s.paddingBottom);
  if (isNaN(pb)) {
    s.paddingBottom = '80px';
  } else if (pb < 60) {
    s.paddingBottom = '48px'; // py-12
  } else {
    s.paddingBottom = '80px'; // py-20
  }

  // 4. Ensure full width
  s.width = '100%';
  
  return s;
};

const PageRenderer = ({ schema, skipProvider = false }) => {
  if (!schema) return null;

  const { sections, GlobalTheme } = schema;

  // Render blocks in vertical list order
  const content = (
    <div className="builder-canvas flex flex-col w-full overflow-x-hidden bg-white">
      {sections.map((section) => {
        const SectionComponent = SECTION_MAP[section.type];
        if (!SectionComponent) {
          console.warn(`No component found for type: ${section.type}`);
          return null;
        }

        const animationKey = section.animation ? JSON.stringify(section.animation) : (section.styles.animation || 'none');
        
        // Apply Auto-Correction Logic
        const normalizedStyles = normalizeSectionStyles(section);

        return (
          <div 
            id={section.id} 
            key={`${section.id}-${animationKey}`} 
            className="w-full relative"
            style={{ 
              // Prevent unwanted gaps by ensuring each block container is clean
              display: 'block',
              margin: 0,
              padding: 0 
            }}
          >
            <SectionComponent 
              settings={section.settings} 
              styles={normalizedStyles} 
              animation={section.animation}
            />
          </div>
        );
      })}
    </div>
  );

  if (skipProvider) return content;

  return (
    <BuilderThemeProvider theme={GlobalTheme}>
      {content}
    </BuilderThemeProvider>
  );
};

export default PageRenderer;
