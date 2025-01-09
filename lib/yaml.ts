import yaml from 'yaml';
import { ResumeData } from '@/types/resume';
import { ResumeConfig } from '@/types/config';

// 该函数递归地遍历对象（或数组），并替换字符串中的环境变量：
// 如果对象是字符串：使用正则表达式 \$\{([^}]+)\} 匹配 ${} 中的内容，将其替换为 process.env[key] 中的环境变量值。如果环境变量不存在，替换为空字符串。
// 如果对象是数组：遍历数组中的每个项，递归调用 replaceEnvVars。
// 如果对象是对象：遍历对象的每个属性，递归调用 replaceEnvVars。
function replaceEnvVars<T>(obj: T): T {
  if (typeof obj === 'string') {
    return obj.replace(/\$\{([^}]+)\}/g, (_, key) => process.env[key] || '') as T;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => replaceEnvVars(item)) as T;
  }
  
  if (typeof obj === 'object' && obj !== null) {
    const result = {} as { [K in keyof T]: T[K] };
    for (const key in obj) {
      result[key as keyof T] = replaceEnvVars(obj[key as keyof T]);
    }
    return result as T;
  }
  
  return obj;
}

// 解析 YAML 内容：yaml.parse(yamlContent) 将 YAML 格式的字符串 yamlContent 解析为 JavaScript 对象，并指定类型为 ResumeData。

export async function parseResumeYaml(yamlContent: string): Promise<ResumeData> {
  try {
    const data = yaml.parse(yamlContent);
    
    // Handle required fields
    if (!data.metadata) {
      data.metadata = {};
    }
    if (!data.sections) {
      data.sections = [];
    }

    return replaceEnvVars(data);
  } catch (error) {
    console.error('Error parsing YAML:', error);
    throw new Error('Invalid YAML format');
  }
}

export async function parseConfigYaml(yamlContent: string): Promise<ResumeConfig> {
  try {
    const parsed = yaml.parse(yamlContent);
    const config = replaceEnvVars(parsed);
    
    // Validate theme
    if (config.theme) {
      const theme = config.theme.toLowerCase();
      if (!['light', 'dark', 'system'].includes(theme)) {
        config.theme = 'system';
      }
    } else {
      config.theme = 'system';
    }
    
    return config;
  } catch (error) {
    throw new Error(`Failed to parse config YAML: ${error}`);
  }
}